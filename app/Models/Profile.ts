import { DateTime } from 'luxon'
import { BelongsTo, beforeCreate, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import User from './User'
import AppBaseModel from './AppBaseModel'

export default class Profile extends AppBaseModel {
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public userId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(profile: Profile) {
    profile.id = uuid()
  }

  @computed()
  public get fullName() {
    return this.firstName + ' ' + this.lastName
  }
}
