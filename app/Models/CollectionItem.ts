import { DateTime } from 'luxon'
import { BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Collection from './Collection'
import AppBaseModel from './AppBaseModel'

export default class CollectionItem extends AppBaseModel {
  @belongsTo(() => Collection)
  public collection: BelongsTo<typeof Collection>

  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  // dont use slugify here, because there is no field as reference
  @column()
  public slug: string

  @column()
  public slugTarget: string

  @column()
  public content: Object

  @column()
  public collectionId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(collectionItem: CollectionItem) {
    collectionItem.id = uuid()
  }
}
