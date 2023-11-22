"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
class CamelCaseNamingStrategy extends Orm_1.SnakeCaseNamingStrategy {
    serializedName(_model, propertyName) {
        return Helpers_1.string.camelCase(propertyName);
    }
}
exports.default = CamelCaseNamingStrategy;
//# sourceMappingURL=CamelCaseNamingStrategy.js.map