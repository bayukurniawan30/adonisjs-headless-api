// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Singleton from 'App/Models/Singleton'

export default class SingletonsController {
  protected model = Singleton
  protected relationships = ['singletonItem']
  protected policy = 'SingletonPolicy'
}
