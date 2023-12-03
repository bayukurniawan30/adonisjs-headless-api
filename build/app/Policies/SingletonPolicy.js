"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bouncer_1 = global[Symbol.for('ioc.use')]("Adonis/Addons/Bouncer");
class SingletonPolicy extends Bouncer_1.BasePolicy {
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
    async update(user, singleton) {
        return singleton.userId === user.id || user.isAdmin;
    }
    async delete(user, singleton) {
        return singleton.userId === user.id || user.isAdmin;
    }
}
exports.default = SingletonPolicy;
//# sourceMappingURL=SingletonPolicy.js.map