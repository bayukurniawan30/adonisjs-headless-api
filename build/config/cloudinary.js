"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const cloudinaryConfig = {
    cloudName: Env_1.default.get('CLOUDINARY_CLOUD_NAME'),
    apiKey: Env_1.default.get('CLOUDINARY_API_KEY'),
    apiSecret: Env_1.default.get('CLOUDINARY_API_SECRET'),
    secure: Env_1.default.get('CLOUDINARY_SECURE', true),
    scaling: {
        transformation: {
            format: 'png',
        },
        width: 150,
        height: 150,
        crop: 'fit',
    },
    thumbnailPrefixName: 'thumb_',
};
exports.default = cloudinaryConfig;
//# sourceMappingURL=cloudinary.js.map