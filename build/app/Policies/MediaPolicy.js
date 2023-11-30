"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bouncer_1 = global[Symbol.for('ioc.use')]("Adonis/Addons/Bouncer");
class MediaPolicy extends Bouncer_1.BasePolicy {
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
    async update(user, media) {
        return media.userId === user.id || user.isAdmin;
    }
    async delete(user, media) {
        return media.userId === user.id || user.isAdmin;
    }
}
exports.default = MediaPolicy;
//# sourceMappingURL=MediaPolicy.js.map