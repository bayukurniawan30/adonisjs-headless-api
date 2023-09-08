import User from 'App/Models/User'
import CrudController from './CrudController'

export default class UsersController extends CrudController {
  protected model = User
  protected relationships = ['profile']
}
