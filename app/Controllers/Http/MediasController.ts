// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Media from 'App/Models/Media'
import CrudController from './CrudController'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import cloudinary from '@ioc:Adonis/Addons/Cloudinary'
import { schema } from '@ioc:Adonis/Core/Validator'
import Env from '@ioc:Adonis/Core/Env'
import Application from '@ioc:Adonis/Core/Application'
import { uploadPath } from 'Config/app'
import cloudinaryConfig from 'Config/cloudinary'
import sharp from 'sharp'
import Drive from '@ioc:Adonis/Core/Drive'

export default class MediasController extends CrudController {
  protected model = Media
  protected relationships = ['user']
  protected policy = 'MediaPolicy'

  public async store({ auth, request, response }: HttpContextContract) {
    // validate uploaded file
    // check file size
    // check file extension
    const allowedMimeTypes = [
      'jpg',
      'gif',
      'png',
      'jpeg',
      'webp',
      'mp4',
      'pdf',
      'doc',
      'docx',
      'xls',
      'xlsx',
      'csv',
      'txt',
    ]

    const validatedSchema = schema.create({
      file: schema.file({
        size: '5mb',
        extnames: allowedMimeTypes,
      }),
    })
    const payload = await request.validate({ schema: validatedSchema })

    // get file info and generate new unique name
    const uniqueTime = new Date().getTime().toString()
    const fileType = payload.file.type
    const fileSize = payload.file.size
    const fileName = `${uniqueTime}.${payload.file.subtype}`

    // check if system supports cloudinary for file storage
    // if support, the file will be uploaded first to cloudinary
    // then create a new data in database
    let refId: string | null = null
    let url
    let mediaType = ''
    // below is a variable for image media
    let thumbnailUrl: string = ''
    let width: number = 0
    let height: number = 0

    // other than image and video, it will be treated as document
    switch (fileType) {
      case 'image':
      case 'video':
        mediaType = fileType
        break
      default:
        mediaType = 'document'
        break
    }

    if (Env.get('STORAGE_WRAPPER') === 'cloudinary') {
      // this is specific for cloudinary
      // if you cant open the public url of pdf file, please refer to https://support.cloudinary.com/hc/en-us/articles/360016480179-PDF-or-ZIP-files-appearing-in-Media-Library-but-download-URLs-return-an-error-
      // need to check Allow delivery of PDF and ZIP files in the settings page
      // PDF file is treated as an image in cloudinary
      const resourceType = fileType !== 'video' && fileType !== 'image' ? 'auto' : fileType
      const upload = await this.uploadToCloudinary(payload, uniqueTime, resourceType)
      refId = upload.refId
      url = upload.url

      if (fileType === 'image') {
        // set width and height
        width = upload.width
        height = upload.height

        // create thumbnail, use the transformation feature in cloudinary
        const thumbnailUpload = await cloudinary.upload(
          payload.file,
          `${cloudinaryConfig.thumbnailPrefixName}${uniqueTime}`,
          {
            resource_type: resourceType,
            transformation: {
              crop: 'fill',
              width: 250,
              height: 250,
            },
          }
        )
        thumbnailUrl = thumbnailUpload.secure_url
      }

      const model = this.model
      let storePayload: Partial<Media> = {
        url,
        thumbnailUrl,
        type: mediaType,
        size: fileSize,
        width,
        height,
        refId,
      }
      if (model.$hasColumn('userId')) {
        storePayload = {
          ...storePayload,
          userId: auth.user ? auth.user.id : '',
        }
      }
      const result = await model.create(storePayload)
      return response.status(201).json(result)
    } else {
      await payload.file.move(Application.publicPath(uploadPath), {
        name: fileName,
        overwrite: true,
      })
      const filePath = `${uploadPath}/${fileName}`

      let thumbnailFilePath = ''
      if (fileType === 'image') {
        // set width and height
        const metadata = await sharp(`${Application.publicPath(uploadPath)}/${fileName}`).metadata()
        width = metadata.width ?? 0
        height = metadata.height ?? 0

        thumbnailFilePath = `${uploadPath}/${cloudinaryConfig.thumbnailPrefixName}${fileName}`
        // create thumbnail, use sharp library
        await sharp(`${Application.publicPath(uploadPath)}/${fileName}`)
          .resize({ width: 250, height: 250, fit: 'cover' })
          .toFile(
            `${Application.publicPath(uploadPath)}/${
              cloudinaryConfig.thumbnailPrefixName
            }${fileName}`
          )
      }

      const model = this.model
      let storePayload: Partial<Media> = {
        url: filePath,
        thumbnailUrl: thumbnailFilePath,
        type: mediaType,
        size: fileSize,
        width,
        height,
      }
      if (model.$hasColumn('userId')) {
        storePayload = {
          ...storePayload,
          userId: auth.user ? auth.user.id : '',
        }
      }
      const result = await model.create(storePayload)
      return response.status(201).json(result)
    }
  }

  public async destroy({ request, response, bouncer }: HttpContextContract) {
    const model = this.model
    const data = await model.findOrFail(request.param('id'))

    if (this.policy) {
      await bouncer.with('MediaPolicy').authorize('delete', data)
    }

    if (Env.get('STORAGE_WRAPPER') === 'cloudinary') {
      // destroy the media from cloudinary
      const destroy = await cloudinary.destroy(data.refId)
      if (destroy.result === 'ok') {
        await data.delete()
        return response.status(204)
      } else {
        return response.status(500)
      }
    } else {
      // destroy the media from local
      await Drive.delete(data.url)
      if (data.thumbnailUrl) {
        await Drive.delete(data.thumbnailUrl)
      }

      await data.delete()
      return response.status(204)
    }
  }

  private async uploadToCloudinary(
    payload,
    uniqueTime: string,
    resourceType: 'video' | 'image' | 'raw' | 'auto' | undefined
  ) {
    const upload = await cloudinary.upload(payload.file, uniqueTime, {
      resource_type: resourceType,
    })
    return {
      refId: upload.public_id,
      url: upload.secure_url,
      width: upload.width,
      height: upload.height,
    }
  }
}
