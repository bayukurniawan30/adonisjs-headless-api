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
const User_1 = __importDefault(require("./User"));
const AppBaseModel_1 = __importDefault(require("./AppBaseModel"));
class Profile extends AppBaseModel_1.default {
    static async createUUID(profile) {
        profile.id = (0, uuid_1.v4)();
    }
    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }
}
Profile.selfAssignPrimaryKey = true;
__decorate([
    (0, Orm_1.belongsTo)(() => User_1.default),
    __metadata("design:type", Object)
], Profile.prototype, "user", void 0);
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", String)
], Profile.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Profile.prototype, "firstName", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Profile.prototype, "lastName", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Profile.prototype, "userId", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Profile.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Profile.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.computed)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Profile.prototype, "fullName", null);
__decorate([
    (0, Orm_1.beforeCreate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Profile]),
    __metadata("design:returntype", Promise)
], Profile, "createUUID", null);
exports.default = Profile;
//# sourceMappingURL=Profile.js.map