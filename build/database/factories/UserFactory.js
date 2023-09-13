"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Factory_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Factory"));
const ProfileFactory_1 = __importDefault(require("./ProfileFactory"));
exports.default = Factory_1.default.define(User_1.default, ({ faker }) => {
    return {
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
})
    .relation('profile', () => ProfileFactory_1.default)
    .build();
//# sourceMappingURL=UserFactory.js.map