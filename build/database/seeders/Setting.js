"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const Setting_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Setting"));
class default_1 extends Seeder_1.default {
    async run() {
        await Setting_1.default.createMany([
            {
                key: 'date-format',
                value: 'MMM D, YY',
            },
            {
                key: 'time-format',
                value: 'h:mm A',
            },
        ]);
    }
}
exports.default = default_1;
//# sourceMappingURL=Setting.js.map