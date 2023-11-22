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
const User_1 = __importDefault(require("./User"));
const LucidSlugify_1 = global[Symbol.for('ioc.use')]("Adonis/Addons/LucidSlugify");
const uuid_1 = require("uuid");
const CollectionItem_1 = __importDefault(require("./CollectionItem"));
const AppBaseModel_1 = __importDefault(require("./AppBaseModel"));
class Collection extends AppBaseModel_1.default {
    static async createUUID(collection) {
        collection.id = (0, uuid_1.v4)();
    }
}
Collection.selfAssignPrimaryKey = true;
__decorate([
    (0, Orm_1.belongsTo)(() => User_1.default),
    __metadata("design:type", Object)
], Collection.prototype, "user", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => CollectionItem_1.default),
    __metadata("design:type", Object)
], Collection.prototype, "collectionItems", void 0);
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", String)
], Collection.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Collection.prototype, "name", void 0);
__decorate([
    (0, Orm_1.column)(),
    (0, LucidSlugify_1.slugify)({
        strategy: 'dbIncrement',
        fields: ['name'],
    }),
    __metadata("design:type", String)
], Collection.prototype, "slug", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Object)
], Collection.prototype, "fields", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Collection.prototype, "status", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], Collection.prototype, "isConnecting", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Collection.prototype, "sorting", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Collection.prototype, "ordering", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Collection.prototype, "userId", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Collection.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Collection.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.beforeCreate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Collection]),
    __metadata("design:returntype", Promise)
], Collection, "createUUID", null);
exports.default = Collection;
//# sourceMappingURL=Collection.js.map