"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AvailableField_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/AvailableField"));
const Factory_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Factory"));
exports.default = Factory_1.default.define(AvailableField_1.default, ({ faker }) => {
    return {};
}).build();
//# sourceMappingURL=AvailableFieldFactory.js.map