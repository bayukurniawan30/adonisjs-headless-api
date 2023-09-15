// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Collection from 'App/Models/Collection'
import CrudController from './CrudController'

export default class CollectionsController extends CrudController {
  protected model = Collection
  protected relationships = ['collectionItems']
}
