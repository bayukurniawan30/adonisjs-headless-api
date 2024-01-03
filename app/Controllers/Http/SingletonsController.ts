import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import Singleton from 'App/Models/Singleton'
import CrudController from './CrudController'
import AvailableField from 'App/Models/AvailableField'

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
    console.log(
      '🚀 ~ file: SingletonsController.ts:19 ~ SingletonsController ~ store ~ payload:',
      payload
    )

    let parseFields
    const fields = []
    if (!payload.fields && payload.fields !== '') {
      parseFields = JSON.parse(payload.fields)
      if (parseFields.length > 0) {
        const fields = {}
        parseFields.map((field: AvailableField, index) => {
          fields[index] = {
            id: field.id,
            metadata: field.metadata,
          }
        })
      }
    }
    console.log(
      '🚀 ~ file: SingletonsController.ts:26 ~ SingletonsController ~ store ~ fields:',
      fields
    )

    const model = this.model
    const result = await model.create({
      name: payload.name,
      status: payload.status,
      userId: auth.user ? auth.user.id : '',
      fields: JSON.stringify(fields),
    })

    return response.status(201).json(result)
  }
}
