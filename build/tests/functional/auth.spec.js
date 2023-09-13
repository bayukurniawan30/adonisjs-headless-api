"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runner_1 = require("@japa/runner");
const UserFactory_1 = __importDefault(global[Symbol.for('ioc.use')]("Database/factories/UserFactory"));
runner_1.test.group('Auth', () => {
    (0, runner_1.test)('can login user with valid credentials', async ({ client, assert }) => {
        const user = await UserFactory_1.default.merge({ password: 'secret' }).create();
        const response = await client.post('/api/login').json({
            email: user.email,
            password: 'secret',
        });
        const result = JSON.parse(response.text());
        response.assertStatus(200);
        assert.equal(result.user.email, user.email);
    });
    (0, runner_1.test)('cannot login user with invalid credentials', async ({ client }) => {
        const user = await UserFactory_1.default.merge({ password: 'secret' }).create();
        const response = await client.post('/api/login').json({
            email: user.email,
            password: 'secretss',
        });
        response.assertStatus(400);
    });
});
//# sourceMappingURL=auth.spec.js.map