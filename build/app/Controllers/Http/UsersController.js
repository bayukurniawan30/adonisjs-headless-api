"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const CrudController_1 = __importDefault(require("./CrudController"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UsersController extends CrudController_1.default {
    constructor() {
        super(...arguments);
        this.model = User_1.default;
        this.relationships = ['profile'];
    }
    async store({ request, response }) {
        const validatedSchema = Validator_1.schema.create({
            firstName: Validator_1.schema.string(),
            lastName: Validator_1.schema.string(),
            email: Validator_1.schema.string([Validator_1.rules.email()]),
            password: Validator_1.schema.string([Validator_1.rules.minLength(6)]),
        });
        const payload = await request.validate({ schema: validatedSchema });
        const model = this.model;
        const result = await model.create({
            email: payload.email,
            isAdmin: false,
            password: payload.password,
        });
        await result.related('profile').create({
            firstName: payload.firstName.trim(),
            lastName: payload.lastName.trim(),
        });
        return response.status(201).json(result);
    }
    async update({ request, response }) {
        const validatedSchema = Validator_1.schema.create({
            firstName: Validator_1.schema.string(),
            lastName: Validator_1.schema.string(),
            email: Validator_1.schema.string([Validator_1.rules.email()]),
        });
        const payload = await request.validate({ schema: validatedSchema });
        const model = this.model;
        const data = await model.findOrFail(request.param('id'));
        data.merge({
            email: payload.email,
        });
        const result = await data.save();
        const profile = await data.related('profile').firstOrCreate({});
        profile.firstName = payload.firstName;
        profile.lastName = payload.lastName;
        await profile.save();
        return response.status(200).json(result);
    }
}
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map