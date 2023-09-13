"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const CrudController_1 = __importDefault(require("./CrudController"));
class UsersController extends CrudController_1.default {
    constructor() {
        super(...arguments);
        this.model = User_1.default;
        this.relationships = ['profile'];
    }
}
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map