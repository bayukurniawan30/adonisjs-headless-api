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
class MediasController extends CrudController_1.default {
    constructor() {
        super(...arguments);
        this.model = Media_1.default;
        this.policy = 'MediaPolicy';
    }
    async store({ request, response }) {
        const validatedSchema = Validator_1.schema.create({
            file: Validator_1.schema.file({
                size: '5mb',
                extnames: [
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
                ],
            }),
        });
        const payload = await request.validate({ schema: validatedSchema });
        const uniqueTime = new Date().getTime().toString();
        const fileType = payload.file.type;
        const fileSize = payload.file.size;
        const fileName = `${uniqueTime}.${payload.file.subtype}`;
        let refId = null;
        let url;
        let thumbnailUrl = '';
        let width = 0;
        let height = 0;
        if (Env_1.default.get('STORAGE_WRAPPER') === 'cloudinary') {
            let resourceType = 'image';
            if (fileType !== 'video' && fileType !== 'image') {
                resourceType = 'auto';
            }
            else {
                resourceType = fileType;
            }
            const upload = await Cloudinary_1.default.upload(payload.file, uniqueTime, {
                resource_type: resourceType,
            });
            refId = upload.public_id;
            url = upload.secure_url;
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
            const result = await model.create({
                url,
                thumbnailUrl,
                type: fileType,
                size: fileSize,
                width,
                height,
                refId,
            });
            return response.status(201).json(result);
        }
        else {
            await payload.file.move(Application_1.default.publicPath(app_1.uploadPath), {
                name: fileName,
                overwrite: true,
            });
            const filePath = `${app_1.uploadPath}/${fileName}`;
            let thumbnailFilePath = '';
            let mediaType = '';
            if (fileType === 'image') {
                const metadata = await (0, sharp_1.default)(`${Application_1.default.publicPath(app_1.uploadPath)}/${fileName}`).metadata();
                width = metadata.width ?? 0;
                height = metadata.height ?? 0;
                thumbnailFilePath = `${app_1.uploadPath}/${cloudinary_1.default.thumbnailPrefixName}${fileName}`;
                await (0, sharp_1.default)(`${Application_1.default.publicPath(app_1.uploadPath)}/${fileName}`)
                    .resize({ width: 250, height: 250, fit: 'cover' })
                    .toFile(`${Application_1.default.publicPath(app_1.uploadPath)}/${cloudinary_1.default.thumbnailPrefixName}${fileName}`);
            }
            switch (fileType) {
                case 'image':
                    mediaType = 'image';
                    break;
                case 'video':
                    mediaType = 'video';
                    break;
                default:
                    mediaType = 'document';
                    break;
            }
            const model = this.model;
            const result = await model.create({
                url: filePath,
                thumbnailUrl: thumbnailFilePath,
                type: mediaType,
                size: fileSize,
                width,
                height,
            });
            return response.status(201).json(result);
        }
    }
}
exports.default = MediasController;
//# sourceMappingURL=MediasController.js.map