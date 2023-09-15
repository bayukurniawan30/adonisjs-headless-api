import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  HasMany,
  beforeCreate,
  belongsTo,
  column,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import { v4 as uuid } from 'uuid'
import CollectionItem from './CollectionItem'

export default class Collection extends BaseModel {
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => CollectionItem)
  public collectionItems: HasMany<typeof CollectionItem>

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
  public fields: Object

  @column()
  public status: 'publish' | 'draft'

  @column()
  public isConnecting: boolean

  @column()
  public sorting: string

  @column()
  public ordering: string

  @column()
  public userId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(collection: Collection) {
    collection.id = uuid()
  }
}
