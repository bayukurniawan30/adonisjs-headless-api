import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Collection from 'App/Models/Collection'
import CrudController from './CrudController'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

export default class CollectionsController extends CrudController {
  protected model = Collection
  protected relationships = ['user', 'collectionItems']
  protected policy = 'CollectionPolicy'

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
      await bouncer.with('CollectionPolicy').authorize('update', data)
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
      await bouncer.with('CollectionPolicy').authorize('delete', data)
    }

    // check if singleton has items
    const singletonItem = await data.related('collectionItems').query()
    if (singletonItem.length > 0) {
      return response.status(400)
    }

    await data.delete()
    return response.status(204)
  }
}
