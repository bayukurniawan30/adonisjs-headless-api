"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Setting_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Setting"));
const Factory_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Factory"));
exports.default = Factory_1.default.define(Setting_1.default, ({ faker }) => {
    return {};
}).build();
//# sourceMappingURL=SettingFactory.js.map