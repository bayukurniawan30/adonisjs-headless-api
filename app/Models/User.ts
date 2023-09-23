import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  beforeCreate,
  hasOne,
  HasOne,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import Profile from './Profile'
import Media from './Media'
import Collection from './Collection'
import Singleton from './Singleton'
import AppBaseModel from './AppBaseModel'

export default class User extends AppBaseModel {
  @hasOne(() => Profile)
  public profile: HasOne<typeof Profile>

  @hasMany(() => Media)
  public medias: HasMany<typeof Media>

  @hasMany(() => Collection)
  public collections: HasMany<typeof Collection>

  @hasMany(() => Singleton)
  public singletons: HasMany<typeof Singleton>

  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public isAdmin: boolean

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(user: User) {
    user.id = uuid()
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
