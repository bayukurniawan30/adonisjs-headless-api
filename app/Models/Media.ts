import { DateTime } from 'luxon'
import { BelongsTo, beforeCreate, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuid } from 'uuid'
import User from './User'
import { appUrl } from 'Config/app'
import AppBaseModel from './AppBaseModel'

export default class Media extends AppBaseModel {
  public static table = 'medias'

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public userId: string

  @column()
  public url: string

  @column()
  public thumbnailUrl: string

  @column()
  public type: string

  @column()
  public size: number

  @column()
  public width: number

  @column()
  public height: number

  @column()
  public refId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(media: Media) {
    media.id = uuid()
  }

  @computed()
  public get publicUrl() {
    if (!this.url.includes('http')) {
      return `${appUrl}/${this.url}`
    } else {
      return this.url
    }
  }

  @computed()
  public get publicThumbnailUrl() {
    if (!this.url.includes('http')) {
      return `${appUrl}/${this.thumbnailUrl}`
    } else {
      return this.thumbnailUrl
    }
  }
}
