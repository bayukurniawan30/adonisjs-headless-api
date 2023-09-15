"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Setting_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Setting"));
const CrudController_1 = __importDefault(require("./CrudController"));
class SettingsController extends CrudController_1.default {
    constructor() {
        super(...arguments);
        this.model = Setting_1.default;
    }
}
exports.default = SettingsController;
//# sourceMappingURL=SettingsController.js.map