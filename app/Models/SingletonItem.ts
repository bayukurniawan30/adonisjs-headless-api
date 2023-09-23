import { DateTime } from 'luxon'
import { BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Singleton from './Singleton'
import { v4 as uuid } from 'uuid'
import AppBaseModel from './AppBaseModel'

export default class SingletonItem extends AppBaseModel {
  @belongsTo(() => Singleton)
  public singleton: BelongsTo<typeof Singleton>

  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public content: Object

  @column()
  public singletonId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(singletonItem: SingletonItem) {
    singletonItem.id = uuid()
  }
}
