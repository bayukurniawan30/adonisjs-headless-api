"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bouncer_1 = global[Symbol.for('ioc.use')]("Adonis/Addons/Bouncer");
class MediaPolicy extends Bouncer_1.BasePolicy {
    async before(user) {
        if (user && user.isAdmin) {
            return true;
        }
    }
    async viewList() { }
    async view(user, media) {
        return media.userId === user.id;
    }
    async create(user, media) {
        return media.userId === user.id;
    }
    async update(user, media) {
        return media.userId === user.id;
    }
    async delete(user, media) {
        return media.userId === user.id;
    }
}
exports.default = MediaPolicy;
//# sourceMappingURL=MediaPolicy.js.map