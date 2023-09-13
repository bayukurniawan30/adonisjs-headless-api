"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class AuthController {
    async login({ auth, request, response }) {
        const validationSchema = Validator_1.schema.create({
            email: Validator_1.schema.string({ trim: true }, [Validator_1.rules.email()]),
            password: Validator_1.schema.string({ trim: true }, [Validator_1.rules.minLength(6)]),
        });
        const userDetails = await request.validate({
            schema: validationSchema,
        });
        const email = userDetails.email;
        const password = userDetails.password;
        const token = await auth.use('api').attempt(email, password);
        const user = await User_1.default.findBy('email', email);
        const result = JSON.stringify({
            user,
            token,
        });
        response.send(result);
    }
    async me({ auth, response }) {
        const user = await auth.use('api').authenticate();
        response.send(user);
    }
    async logout({ auth, response }) {
        await auth.use('api').revoke();
        response.send({ message: 'Successfully logged out' });
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map