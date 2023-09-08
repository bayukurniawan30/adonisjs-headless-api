import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    // validate user input
    const validationSchema = schema.create({
      email: schema.string({ trim: true }, [rules.email()]),
      password: schema.string({ trim: true }, [rules.minLength(6)]),
    })

    const userDetails = await request.validate({
      schema: validationSchema,
    })

    // authenticate user with email and password
    const email = userDetails.email
    const password = userDetails.password

    const token = await auth.use('api').attempt(email, password)

    const user = await User.findBy('email', email)
    const result = JSON.stringify({
      user,
      token,
    })

    response.send(result)
  }

  public async me({ auth, response }: HttpContextContract) {
    const user = await auth.use('api').authenticate()
    response.send(user)
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('api').revoke()
    response.send({ message: 'Successfully logged out' })
  }
}
