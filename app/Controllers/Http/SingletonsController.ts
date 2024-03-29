import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Singleton from 'App/Models/Singleton'
import CrudController from './CrudController'
import SingletonItem from 'App/Models/SingletonItem'

export default class SingletonsController extends CrudController {
  protected model = Singleton
  protected relationships = ['user', 'singletonItem']
  protected policy = 'SingletonPolicy'

  public async store({ auth, request, response }: HttpContextContract) {
    const validatedSchema = schema.create({
      name: schema.string(),
      status: schema.string([rules.statusEnum()]),
      fields: schema.string(),
    })
    const payload = await request.validate({ schema: validatedSchema })

    let parseFields
    let fields = []

    if (payload.fields && payload.fields !== '') {
      parseFields = JSON.parse(payload.fields)

      if (parseFields.length > 0) {
        fields = parseFields.map((field) => ({
          id: field.id,
          label: field.label,
          helperText: field.helperText,
          metadata: field.metadata,
        }))
      }
    }

    const model = this.model
    const result = await model.create({
      name: payload.name,
      status: payload.status,
      userId: auth.user ? auth.user.id : '',
      fields: JSON.stringify(fields),
    })

    return response.status(201).json(result)
  }

  public async update({ auth, request, response, bouncer }: HttpContextContract) {
    const validatedSchema = schema.create({
      name: schema.string(),
      status: schema.string([rules.statusEnum()]),
      fields: schema.string(),
    })
    const payload = await request.validate({ schema: validatedSchema })

    let parseFields
    let fields = []

    if (payload.fields && payload.fields !== '') {
      parseFields = JSON.parse(payload.fields)

      if (parseFields.length > 0) {
        fields = parseFields.map((field) => ({
          id: field.id,
          label: field.label,
          helperText: field.helperText,
          metadata: field.metadata,
        }))
      }
    }

    const model = this.model
    const data = await model.findOrFail(request.param('id'))

    if (this.policy) {
      await bouncer.with('SingletonPolicy').authorize('update', data)
    }

    let updatedData = request.all()
    if (model.$hasColumn('user_id')) {
      updatedData = {
        ...request.all(),
        fields: JSON.stringify(fields),
        userId: auth.user ? auth.user.id : null,
      }
    }

    data.merge(updatedData)
    const result = await data.save()
    return response.status(200).json(result)
  }

  public async destroy({ request, response, bouncer }: HttpContextContract) {
    const model = this.model
    const data = await model.findOrFail(request.param('id'))

    if (this.policy) {
      await bouncer.with('SingletonPolicy').authorize('delete', data)
    }

    // check if singleton has items
    const singletonItem = await data.related('singletonItem').query()
    if (singletonItem.length > 0) {
      return response.status(400)
    }

    await data.delete()
    return response.status(204)
  }

  public async item({ request, response }: HttpContextContract) {
    const model = this.model
    const query = model.query()

    if (this.relationships && this.relationships.length > 0) {
      this.relationships.map((relationship) => {
        return query.preload(relationship as any)
      })
    }
    query.where('id', request.param('id'))

    const result = await query.firstOrFail()
    return response.status(200).json(result)
  }

  public async addItem({ request, response }: HttpContextContract) {
    const validatedSchema = schema.create({
      content: schema.string(),
    })
    const payload = await request.validate({ schema: validatedSchema })

    let parseContent
    let content = []

    if (payload.content && payload.content !== '') {
      parseContent = JSON.parse(payload.content)

      if (parseContent.length > 0) {
        content = parseContent.map((ct: { id: string; value: string }) => ({
          id: ct.id,
          value: ct.value,
        }))
      }
    }

    const model = SingletonItem
    const result = await model.create({
      singletonId: request.param('id'),
      content: JSON.stringify(content),
    })

    return response.status(201).json(result)
  }

  public async updateItem({ request, response }: HttpContextContract) {
    const validatedSchema = schema.create({
      content: schema.string(),
    })
    const payload = await request.validate({ schema: validatedSchema })

    let parseContent
    let content = []

    if (payload.content && payload.content !== '') {
      parseContent = JSON.parse(payload.content)

      if (parseContent.length > 0) {
        content = parseContent.map((ct: { id: string; value: string }) => ({
          id: ct.id,
          value: ct.value,
        }))
      }
    }

    const model = SingletonItem
    const data = await model.findOrFail(request.param('itemId'))

    const updatedData = {
      singletonId: request.param('id'),
      content: JSON.stringify(content),
    }
    data.merge(updatedData)

    const result = await data.save()

    return response.status(200).json(result)
  }
}
