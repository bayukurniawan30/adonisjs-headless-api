import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import Singleton from 'App/Models/Singleton'
import User from 'App/Models/User'

export default class SingletonPolicy extends BasePolicy {
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
  public async update(user: User, singleton: Singleton) {
    return singleton.userId === user.id || user.isAdmin
  }
  public async delete(user: User, singleton: Singleton) {
    return singleton.userId === user.id || user.isAdmin
  }
}
