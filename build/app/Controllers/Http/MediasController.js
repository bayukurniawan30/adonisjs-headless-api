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
                extnames: ['jpg', 'gif', 'png', 'jpeg', 'webp', 'mp4', 'pdf'],
            }),
        });
        const payload = await request.validate({ schema: validatedSchema });
        const uniqueTime = new Date().getTime().toString();
        const fileType = payload.file.type;
        const fileSize = payload.file.size;
        const fileName = `${uniqueTime}.${payload.file.subtype}`;
        let refId = null;
        let url;
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
            const model = this.model;
            const result = await model.create({
                url,
                type: fileType,
                size: fileSize,
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
            const model = this.model;
            const result = await model.create({
                url: filePath,
                type: fileType,
                size: fileSize,
            });
            return response.status(201).json(result);
        }
    }
}
exports.default = MediasController;
//# sourceMappingURL=MediasController.js.map