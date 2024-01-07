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
        Route_1.default.resource('users', 'UsersController').apiOnly();
        Route_1.default.resource('medias', 'MediasController').except(['update']).apiOnly();
        Route_1.default.resource('collections', 'CollectionsController').apiOnly();
        Route_1.default.get('/collections/:id/items', 'CollectionsController.items');
        Route_1.default.resource('singletons', 'SingletonsController').apiOnly();
        Route_1.default.get('/singletons/:id/item', 'SingletonsController.item');
        Route_1.default.resource('available-fields', 'AvailableFieldsController');
        Route_1.default.resource('settings', 'SettingsController').apiOnly().only(['index', 'show', 'update']);
    }).middleware('auth');
}).prefix('api');
//# sourceMappingURL=routes.js.map