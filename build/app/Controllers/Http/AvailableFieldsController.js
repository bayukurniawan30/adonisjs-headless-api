"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CrudController_1 = __importDefault(require("./CrudController"));
const AvailableField_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/AvailableField"));
class AvailableFieldsController extends CrudController_1.default {
    constructor() {
        super(...arguments);
        this.model = AvailableField_1.default;
    }
}
exports.default = AvailableFieldsController;
//# sourceMappingURL=AvailableFieldsController.js.map