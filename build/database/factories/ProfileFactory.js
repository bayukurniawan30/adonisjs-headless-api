"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Profile_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Profile"));
const Factory_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Factory"));
exports.default = Factory_1.default.define(Profile_1.default, ({ faker }) => {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
    };
}).build();
//# sourceMappingURL=ProfileFactory.js.map