"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Factory_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Factory"));
const Media_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Media"));
exports.default = Factory_1.default.define(Media_1.default, ({ faker }) => {
    return {};
}).build();
//# sourceMappingURL=MediaFactory.js.map