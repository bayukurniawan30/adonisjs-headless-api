"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const AvailableField_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/AvailableField"));
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
class default_1 extends Seeder_1.default {
    async run() {
        await AvailableField_1.default.createMany([
            {
                name: 'Boolean',
                slug: Helpers_1.string.dashCase('Boolean'),
                additionalText: 'True or false',
            },
            {
                name: 'Color Picker',
                slug: Helpers_1.string.dashCase('Color Picker'),
                additionalText: 'Pick a color',
            },
            {
                name: 'Date Picker',
                slug: Helpers_1.string.dashCase('Date Picker'),
                additionalText: 'Pick a date',
                metadata: {
                    dateFormat: 'yyyy-mm-dd',
                },
            },
            {
                name: 'Time Picker',
                slug: Helpers_1.string.dashCase('Time Picker'),
                additionalText: 'Pick a time',
            },
            {
                name: 'Code Editor',
                slug: Helpers_1.string.dashCase('Code Editor'),
                additionalText: 'Enter some code',
            },
            {
                name: 'Image',
                slug: Helpers_1.string.dashCase('Image'),
                additionalText: 'Upload or choose existing media image',
            },
            {
                name: 'Link',
                slug: Helpers_1.string.dashCase('Link'),
                additionalText: 'Enter a link',
                metadata: {
                    target: ['_self', '_blank'],
                },
            },
            {
                name: 'Number',
                slug: Helpers_1.string.dashCase('Number'),
                additionalText: 'Enter a number',
                metadata: {
                    min: 0,
                    max: 100,
                    step: 1,
                },
            },
            {
                name: 'Password',
                slug: Helpers_1.string.dashCase('Password'),
                additionalText: '',
                metadata: {
                    minLength: 6,
                    maxLength: 20,
                },
            },
            {
                name: 'Selectbox',
                slug: Helpers_1.string.dashCase('Selectbox'),
                additionalText: '',
                metadata: {
                    fields: [
                        {
                            label: 'Option 1',
                            value: '1',
                        },
                        {
                            label: 'Option 2',
                            value: '2',
                        },
                    ],
                },
            },
            {
                name: 'Text Input',
                slug: Helpers_1.string.dashCase('Text Input'),
                additionalText: '',
                metadata: {
                    placeholder: '',
                    minLength: 1,
                    maxLength: 200,
                    type: 'text',
                },
            },
            {
                name: 'Textarea',
                slug: Helpers_1.string.dashCase('Textarea'),
                additionalText: '',
                metadata: {
                    placeholder: '',
                    minLength: 1,
                    maxLength: 200,
                    rows: 5,
                },
            },
        ]);
    }
}
exports.default = default_1;
//# sourceMappingURL=AvailableField.js.map