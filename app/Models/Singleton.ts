import { DateTime } from 'luxon'
import { BelongsTo, HasOne, beforeCreate, belongsTo, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import SingletonItem from './SingletonItem'
import User from './User'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import { v4 as uuid } from 'uuid'
import AppBaseModel from './AppBaseModel'

export default class Singleton extends AppBaseModel {
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasOne(() => SingletonItem)
  public singletonItem: HasOne<typeof SingletonItem>

  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  @slugify({
    strategy: 'dbIncrement',
    fields: ['name'],
  })
  public slug: string

  @column()
  public fields: string

  @column()
  public status: string

  @column()
  public userId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(singleton: Singleton) {
    singleton.id = uuid()
  }
}
