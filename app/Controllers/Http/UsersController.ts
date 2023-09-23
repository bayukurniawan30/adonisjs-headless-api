import User from 'App/Models/User'
import CrudController from './CrudController'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UsersController extends CrudController {
  protected model = User
  protected relationships = ['profile']

  public async store({ request, response }: HttpContextContract) {
    const validatedSchema = schema.create({
      firstName: schema.string(),
      lastName: schema.string(),
      email: schema.string([rules.email()]),
      password: schema.string([rules.minLength(6)]),
    })
    const payload = await request.validate({ schema: validatedSchema })

    const model = this.model
    const result = await model.create({
      email: payload.email,
      isAdmin: false,
      password: payload.password,
    })

    await result.related('profile').create({
      firstName: payload.firstName.trim(),
      lastName: payload.lastName.trim(),
    })

    return response.status(201).json(result)
  }

  public async update({ request, response }: HttpContextContract) {
    const validatedSchema = schema.create({
      firstName: schema.string(),
      lastName: schema.string(),
      email: schema.string([rules.email()]),
    })
    const payload = await request.validate({ schema: validatedSchema })

    const model = this.model
    const data = await model.findOrFail(request.param('id'))
    data.merge({
      email: payload.email,
    })
    const result = await data.save()

    const profile = await data.related('profile').firstOrCreate({})
    profile.firstName = payload.firstName
    profile.lastName = payload.lastName
    await profile.save()

    return response.status(200).json(result)
  }
}
