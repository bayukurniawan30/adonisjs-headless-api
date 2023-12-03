import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import Collection from 'App/Models/Collection'
import User from 'App/Models/User'

export default class CollectionPolicy extends BasePolicy {
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
  public async update(user: User, collection: Collection) {
    return collection.userId === user.id || user.isAdmin
  }
  public async delete(user: User, collection: Collection) {
    return collection.userId === user.id || user.isAdmin
  }
}
