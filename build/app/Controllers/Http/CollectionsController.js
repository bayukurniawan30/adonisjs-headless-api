"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Collection_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Collection"));
const CrudController_1 = __importDefault(require("./CrudController"));
class CollectionsController extends CrudController_1.default {
    constructor() {
        super(...arguments);
        this.model = Collection_1.default;
        this.relationships = ['collectionItems'];
    }
}
exports.default = CollectionsController;
//# sourceMappingURL=CollectionsController.js.map