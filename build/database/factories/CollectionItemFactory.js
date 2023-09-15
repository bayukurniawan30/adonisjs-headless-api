"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CollectionItem_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/CollectionItem"));
const Factory_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Factory"));
exports.default = Factory_1.default.define(CollectionItem_1.default, ({ faker }) => {
    return {};
}).build();
//# sourceMappingURL=CollectionItemFactory.js.map