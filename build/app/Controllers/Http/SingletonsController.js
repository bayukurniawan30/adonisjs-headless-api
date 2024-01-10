"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Singleton_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Singleton"));
const CrudController_1 = __importDefault(require("./CrudController"));
const SingletonItem_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/SingletonItem"));
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
                    label: field.label,
                    helperText: field.helperText,
                    metadata: field.metadata,
                }));
            }
        }
        const model = this.model;
        const result = await model.create({
            name: payload.name,
            status: payload.status,
            userId: auth.user ? auth.user.id : '',
            fields: JSON.stringify(fields),
        });
        return response.status(201).json(result);
    }
    async update({ auth, request, response, bouncer }) {
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
                    label: field.label,
                    helperText: field.helperText,
                    metadata: field.metadata,
                }));
            }
        }
        const model = this.model;
        const data = await model.findOrFail(request.param('id'));
        if (this.policy) {
            await bouncer.with('SingletonPolicy').authorize('update', data);
        }
        let updatedData = request.all();
        if (model.$hasColumn('user_id')) {
            updatedData = {
                ...request.all(),
                fields: JSON.stringify(fields),
                userId: auth.user ? auth.user.id : null,
            };
        }
        data.merge(updatedData);
        const result = await data.save();
        return response.status(200).json(result);
    }
    async destroy({ request, response, bouncer }) {
        const model = this.model;
        const data = await model.findOrFail(request.param('id'));
        if (this.policy) {
            await bouncer.with('SingletonPolicy').authorize('delete', data);
        }
        const singletonItem = await data.related('singletonItem').query();
        if (singletonItem.length > 0) {
            return response.status(400);
        }
        await data.delete();
        return response.status(204);
    }
    async item({ request, response }) {
        const model = this.model;
        const query = model.query();
        if (this.relationships && this.relationships.length > 0) {
            this.relationships.map((relationship) => {
                return query.preload(relationship);
            });
        }
        query.where('id', request.param('id'));
        const result = await query.firstOrFail();
        return response.status(200).json(result);
    }
    async addItem({ request, response }) {
        const validatedSchema = Validator_1.schema.create({
            content: Validator_1.schema.string(),
        });
        const payload = await request.validate({ schema: validatedSchema });
        let parseContent;
        let content = [];
        if (payload.content && payload.content !== '') {
            parseContent = JSON.parse(payload.content);
            if (parseContent.length > 0) {
                content = parseContent.map((ct) => ({
                    id: ct.id,
                    value: ct.value,
                }));
            }
        }
        const model = SingletonItem_1.default;
        const result = await model.create({
            singletonId: request.param('id'),
            content: JSON.stringify(content),
        });
        return response.status(201).json(result);
    }
    async updateItem({ request, response }) {
        const validatedSchema = Validator_1.schema.create({
            content: Validator_1.schema.string(),
        });
        const payload = await request.validate({ schema: validatedSchema });
        let parseContent;
        let content = [];
        if (payload.content && payload.content !== '') {
            parseContent = JSON.parse(payload.content);
            if (parseContent.length > 0) {
                content = parseContent.map((ct) => ({
                    id: ct.id,
                    value: ct.value,
                }));
            }
        }
        const model = SingletonItem_1.default;
        const data = await model.findOrFail(request.param('itemId'));
        const updatedData = {
            singletonId: request.param('id'),
            content: JSON.stringify(content),
        };
        data.merge(updatedData);
        const result = await data.save();
        return response.status(200).json(result);
    }
}
exports.default = SingletonsController;
//# sourceMappingURL=SingletonsController.js.map