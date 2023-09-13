"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const UserFactory_1 = __importDefault(global[Symbol.for('ioc.use')]("Database/factories/UserFactory"));
class default_1 extends Seeder_1.default {
    async run() {
        await UserFactory_1.default.merge({
            email: 'admin@example.com',
            password: 'secret',
            isAdmin: true,
        })
            .with('profile')
            .create();
        await UserFactory_1.default.merge({
            email: 'user@example.com',
            password: 'secret',
        })
            .with('profile')
            .create();
    }
}
exports.default = default_1;
//# sourceMappingURL=User.js.map