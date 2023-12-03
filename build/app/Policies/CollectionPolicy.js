"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bouncer_1 = global[Symbol.for('ioc.use')]("Adonis/Addons/Bouncer");
class CollectionPolicy extends Bouncer_1.BasePolicy {
    async viewList() {
        return true;
    }
    async view() {
        return true;
    }
    async create(user) {
        if (user) {
            return true;
        }
    }
    async update(user, collection) {
        return collection.userId === user.id || user.isAdmin;
    }
    async delete(user, collection) {
        return collection.userId === user.id || user.isAdmin;
    }
}
exports.default = CollectionPolicy;
//# sourceMappingURL=CollectionPolicy.js.map