import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import Media from 'App/Models/Media'
import User from 'App/Models/User'

export default class MediaPolicy extends BasePolicy {
  public async before(user: User | null) {
    if (user && user.isAdmin) {
      return true
    }
  }
  public async viewList() {}
  public async view(user: User, media: Media) {
    return media.userId === user.id
  }
  public async create(user: User, media: Media) {
    return media.userId === user.id
  }
  public async update(user: User, media: Media) {
    return media.userId === user.id
  }
  public async delete(user: User, media: Media) {
    return media.userId === user.id
  }
}
