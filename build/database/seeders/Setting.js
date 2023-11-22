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
                selectable: JSON.stringify([
                    {
                        key: 'MMM D, YY',
                        value: 'MMM D, YY',
                    },
                    {
                        key: 'DD/MM/YYYY',
                        value: 'DD/MM/YYYY',
                    },
                    {
                        key: 'dddd, MMMM D, YYYY',
                        value: 'dddd, MMMM D, YYYY',
                    },
                ]),
            },
            {
                key: 'time-format',
                value: 'h:mm A',
                selectable: JSON.stringify([
                    {
                        key: 'h:mm A',
                        value: 'h:mm A',
                    },
                    {
                        key: 'HH:mm',
                        value: 'HH:mm',
                    },
                ]),
            },
        ]);
    }
}
exports.default = default_1;
//# sourceMappingURL=Setting.js.map