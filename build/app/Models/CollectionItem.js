"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const uuid_1 = require("uuid");
const Collection_1 = __importDefault(require("./Collection"));
class CollectionItem extends Orm_1.BaseModel {
    static async createUUID(collectionItem) {
        collectionItem.id = (0, uuid_1.v4)();
    }
}
CollectionItem.selfAssignPrimaryKey = true;
__decorate([
    (0, Orm_1.belongsTo)(() => Collection_1.default),
    __metadata("design:type", Object)
], CollectionItem.prototype, "collection", void 0);
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", String)
], CollectionItem.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], CollectionItem.prototype, "slug", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], CollectionItem.prototype, "slugTarget", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Object)
], CollectionItem.prototype, "content", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], CollectionItem.prototype, "collectionId", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], CollectionItem.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], CollectionItem.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.beforeCreate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CollectionItem]),
    __metadata("design:returntype", Promise)
], CollectionItem, "createUUID", null);
exports.default = CollectionItem;
//# sourceMappingURL=CollectionItem.js.map