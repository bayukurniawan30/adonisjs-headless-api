import Singleton from 'App/Models/Singleton'
import CrudController from './CrudController'

export default class SingletonsController extends CrudController {
  protected model = Singleton
  protected relationships = ['user', 'singletonItem']
  protected policy = 'SingletonPolicy'
}
