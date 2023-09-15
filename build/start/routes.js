"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('/', async () => {
    return { hello: 'world' };
});
Route_1.default.group(() => {
    Route_1.default.post('/login', 'AuthController.login');
    Route_1.default.group(() => {
        Route_1.default.get('/me', 'AuthController.me');
        Route_1.default.get('/logout', 'AuthController.logout');
        Route_1.default.resource('medias', 'MediasController');
    }).middleware('auth');
}).prefix('api');
//# sourceMappingURL=routes.js.map