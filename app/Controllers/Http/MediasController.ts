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

export default class MediasController extends CrudController {
  protected model = Media
  protected policy: string = 'MediaPolicy'

  public async store({ request, response }: HttpContextContract) {
    // validate uploaded file
    // check file size
    // check file extension
    const validatedSchema = schema.create({
      file: schema.file({
        size: '5mb',
        extnames: ['jpg', 'gif', 'png', 'jpeg', 'webp', 'mp4', 'pdf'],
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
    let thumbnailUrl: string = ''

    if (Env.get('STORAGE_WRAPPER') === 'cloudinary') {
      // this is specific for cloudinary
      // if you cant open the public url of pdf file, please refer to https://support.cloudinary.com/hc/en-us/articles/360016480179-PDF-or-ZIP-files-appearing-in-Media-Library-but-download-URLs-return-an-error-
      // need to check Allow delivery of PDF and ZIP files in the settings page
      // PDF file is treated as an image in cloudinary
      let resourceType: 'video' | 'image' | 'raw' | 'auto' | undefined = 'image'
      if (fileType !== 'video' && fileType !== 'image') {
        resourceType = 'auto'
      } else {
        resourceType = fileType
      }

      const upload = await cloudinary.upload(payload.file, uniqueTime, {
        resource_type: resourceType,
      })
      refId = upload.public_id
      url = upload.secure_url

      if (fileType === 'image') {
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
      const result = await model.create({
        url,
        thumbnailUrl,
        type: fileType,
        size: fileSize,
        refId,
      })
      return response.status(201).json(result)
    } else {
      await payload.file.move(Application.publicPath(uploadPath), {
        name: fileName,
        overwrite: true,
      })
      const filePath = `${uploadPath}/${fileName}`

      let thumbnailFilePath = ''
      if (fileType === 'image') {
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
      const result = await model.create({
        url: filePath,
        thumbnailUrl: thumbnailFilePath,
        type: fileType,
        size: fileSize,
      })
      return response.status(201).json(result)
    }
  }
}
