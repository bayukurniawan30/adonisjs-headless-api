// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Setting from 'App/Models/Setting'
import CrudController from './CrudController'

export default class SettingsController extends CrudController {
  protected model = Setting
}
