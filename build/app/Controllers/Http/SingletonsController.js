"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Singleton_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Singleton"));
class SingletonsController {
    constructor() {
        this.model = Singleton_1.default;
        this.relationships = ['user', 'singletonItem'];
        this.policy = 'SingletonPolicy';
    }
}
exports.default = SingletonsController;
//# sourceMappingURL=SingletonsController.js.map