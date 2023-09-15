// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import CrudController from './CrudController'
import AvailableField from 'App/Models/AvailableField'

export default class AvailableFieldsController extends CrudController {
  protected model = AvailableField
}
