"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SingletonItem_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/SingletonItem"));
const Factory_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Factory"));
exports.default = Factory_1.default.define(SingletonItem_1.default, ({ faker }) => {
    return {};
}).build();
//# sourceMappingURL=SingletonItemFactory.js.map