"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Media_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Media"));
const CrudController_1 = __importDefault(require("./CrudController"));
const Cloudinary_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/Cloudinary"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const app_1 = global[Symbol.for('ioc.use')]("Config/app");
const cloudinary_1 = __importDefault(global[Symbol.for('ioc.use')]("Config/cloudinary"));
const sharp_1 = __importDefault(require("sharp"));
const Drive_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Drive"));
class MediasController extends CrudController_1.default {
    constructor() {
        super(...arguments);
        this.model = Media_1.default;
        this.relationships = ['user'];
        this.policy = 'MediaPolicy';
    }
    async store({ auth, request, response }) {
        const allowedMimeTypes = [
            'jpg',
            'gif',
            'png',
            'jpeg',
            'webp',
            'mp4',
            'pdf',
            'doc',
            'docx',
            'xls',
            'xlsx',
            'csv',
            'txt',
        ];
        const validatedSchema = Validator_1.schema.create({
            file: Validator_1.schema.file({
                size: '5mb',
                extnames: allowedMimeTypes,
            }),
        });
        const payload = await request.validate({ schema: validatedSchema });
        const uniqueTime = new Date().getTime().toString();
        const fileType = payload.file.type;
        const fileSize = payload.file.size;
        const fileName = `${uniqueTime}.${payload.file.subtype}`;
        let refId = null;
        let url;
        let mediaType = '';
        let thumbnailUrl = '';
        let width = 0;
        let height = 0;
        switch (fileType) {
            case 'image':
            case 'video':
                mediaType = fileType;
                break;
            default:
                mediaType = 'document';
                break;
        }
        if (Env_1.default.get('STORAGE_WRAPPER') === 'cloudinary') {
            const resourceType = fileType !== 'video' && fileType !== 'image' ? 'auto' : fileType;
            const upload = await this.uploadToCloudinary(payload, uniqueTime, resourceType);
            refId = upload.refId;
            url = upload.url;
            if (fileType === 'image') {
                width = upload.width;
                height = upload.height;
                const thumbnailUpload = await Cloudinary_1.default.upload(payload.file, `${cloudinary_1.default.thumbnailPrefixName}${uniqueTime}`, {
                    resource_type: resourceType,
                    transformation: {
                        crop: 'fill',
                        width: 250,
                        height: 250,
                    },
                });
                thumbnailUrl = thumbnailUpload.secure_url;
            }
            const model = this.model;
            let storePayload = {
                url,
                thumbnailUrl,
                type: mediaType,
                size: fileSize,
                width,
                height,
                refId,
            };
            if (model.$hasColumn('userId')) {
                storePayload = {
                    ...storePayload,
                    userId: auth.user ? auth.user.id : '',
                };
            }
            const result = await model.create(storePayload);
            return response.status(201).json(result);
        }
        else {
            await payload.file.move(Application_1.default.publicPath(app_1.uploadPath), {
                name: fileName,
                overwrite: true,
            });
            const filePath = `${app_1.uploadPath}/${fileName}`;
            let thumbnailFilePath = '';
            if (fileType === 'image') {
                const metadata = await (0, sharp_1.default)(`${Application_1.default.publicPath(app_1.uploadPath)}/${fileName}`).metadata();
                width = metadata.width ?? 0;
                height = metadata.height ?? 0;
                thumbnailFilePath = `${app_1.uploadPath}/${cloudinary_1.default.thumbnailPrefixName}${fileName}`;
                await (0, sharp_1.default)(`${Application_1.default.publicPath(app_1.uploadPath)}/${fileName}`)
                    .resize({ width: 250, height: 250, fit: 'cover' })
                    .toFile(`${Application_1.default.publicPath(app_1.uploadPath)}/${cloudinary_1.default.thumbnailPrefixName}${fileName}`);
            }
            const model = this.model;
            let storePayload = {
                url: filePath,
                thumbnailUrl: thumbnailFilePath,
                type: mediaType,
                size: fileSize,
                width,
                height,
            };
            if (model.$hasColumn('userId')) {
                storePayload = {
                    ...storePayload,
                    userId: auth.user ? auth.user.id : '',
                };
            }
            const result = await model.create(storePayload);
            return response.status(201).json(result);
        }
    }
    async destroy({ request, response, bouncer }) {
        const model = this.model;
        const data = await model.findOrFail(request.param('id'));
        if (this.policy) {
            await bouncer.with('MediaPolicy').authorize('delete', data);
        }
        if (Env_1.default.get('STORAGE_WRAPPER') === 'cloudinary') {
            const destroy = await Cloudinary_1.default.destroy(data.refId);
            if (destroy.result === 'ok') {
                await data.delete();
                return response.status(204);
            }
            else {
                return response.status(500);
            }
        }
        else {
            await Drive_1.default.delete(data.url);
            if (data.thumbnailUrl) {
                await Drive_1.default.delete(data.thumbnailUrl);
            }
            await data.delete();
            return response.status(204);
        }
    }
    async uploadToCloudinary(payload, uniqueTime, resourceType) {
        const upload = await Cloudinary_1.default.upload(payload.file, uniqueTime, {
            resource_type: resourceType,
        });
        return {
            refId: upload.public_id,
            url: upload.secure_url,
            width: upload.width,
            height: upload.height,
        };
    }
}
exports.default = MediasController;
//# sourceMappingURL=MediasController.js.map