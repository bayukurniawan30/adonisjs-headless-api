import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import Media from 'App/Models/Media'
import User from 'App/Models/User'

export default class MediaPolicy extends BasePolicy {
  public async viewList() {
    return true
  }
  public async view() {
    return true
  }
  public async create(user: User) {
    if (user) {
      return true
    }
  }
  public async update(user: User, media: Media) {
    return media.userId === user.id || user.isAdmin
  }
  public async delete(user: User, media: Media) {
    return media.userId === user.id || user.isAdmin
  }
}
