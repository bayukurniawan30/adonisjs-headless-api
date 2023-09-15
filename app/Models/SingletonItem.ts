import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Singleton from './Singleton'
import { v4 as uuid } from 'uuid'

export default class SingletonItem extends BaseModel {
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
