"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Singleton_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Singleton"));
const CrudController_1 = __importDefault(require("./CrudController"));
class SingletonsController extends CrudController_1.default {
    constructor() {
        super(...arguments);
        this.model = Singleton_1.default;
        this.relationships = ['user', 'singletonItem'];
        this.policy = 'SingletonPolicy';
    }
    async store({ auth, request, response }) {
        const validatedSchema = Validator_1.schema.create({
            name: Validator_1.schema.string(),
            status: Validator_1.schema.string([Validator_1.rules.statusEnum()]),
            fields: Validator_1.schema.string(),
        });
        const payload = await request.validate({ schema: validatedSchema });
        let parseFields;
        let fields = [];
        if (payload.fields && payload.fields !== '') {
            parseFields = JSON.parse(payload.fields);
            if (parseFields.length > 0) {
                fields = parseFields.map((field) => ({
                    id: field.id,
                    metadata: field.metadata,
                }));
            }
        }
        console.log('🚀 ~ file: SingletonsController.ts:26 ~ SingletonsController ~ store ~ fields:', fields);
        const model = this.model;
        const result = await model.create({
            name: payload.name,
            status: payload.status,
            userId: auth.user ? auth.user.id : '',
            fields: JSON.stringify(fields),
        });
        return response.status(201).json(result);
    }
}
exports.default = SingletonsController;
//# sourceMappingURL=SingletonsController.js.map