"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'singletons';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary();
            table.string('name').notNullable();
            table.string('slug').notNullable().unique();
            table.jsonb('fields').notNullable();
            table.string('status', 50).notNullable().defaultTo('draft');
            table.uuid('user_id').references('users.id').onDelete('CASCADE');
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = default_1;
//# sourceMappingURL=1694753990174_singletons.js.map