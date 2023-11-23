import { BaseModel, LucidModel, LucidRow, ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

type Filter = {
  field: string
  value: any
  operator: 'like' | '=' | '<>' | '<' | '>' | '<=' | '>=' | 'in' | 'not in'
}

/**
 * This is a base controller to do CRUD operation
 * Built in filter, sort, and pagination
 * The child class can override these function
 * To use this controller, extend it from child class
 * Example: export default class UsersController extends CrudController {...}
 */
export default abstract class CrudController {
  protected abstract model: typeof BaseModel
  protected relationships
  protected policy

  public async index({ request, response, bouncer }: HttpContextContract) {
    if (this.policy) {
      await bouncer.with(this.policy).authorize('viewList')
    }

    // Require query string module
    const querystring = require('querystring')

    const model = this.model

    // Get and parse query string
    const qs = request.toJSON().query

    let processedModel = model.query()
    // set default page and limit
    const pagination = {
      page: 1,
      limit: 10,
    }

    // check if request has query string
    // if provided, do the filter, sort, order
    // if not, apply the default pagination and sort, without filter
    if (qs && qs.length > 0) {
      const parsedQs = querystring.parse(qs)
      const qsObject = JSON.parse(JSON.stringify(parsedQs))

      // Process query string, sort, order, filter
      processedModel = this.parseQueryString(model, qsObject)

      if (qsObject.hasOwnProperty('page') && qsObject.hasOwnProperty('limit')) {
        const page = parseInt(qsObject.page)
        const limit = parseInt(qsObject.limit)
        pagination.page = page

        if (limit === 0) {
          pagination.page = 1
          pagination.limit = 9999999
        } else {
          pagination.limit = limit
        }
      }
    }

    // preload relationships
    // can preload multiple relationships if array of relationship provided in child controller
    if (this.relationships && this.relationships.length > 0) {
      this.relationships.map((relationship) => {
        return processedModel.preload(relationship)
      })
    }

    const result = await processedModel.paginate(pagination.page, pagination.limit)

    return response.status(200).json(result)
  }

  public async show({ request, response, bouncer }: HttpContextContract) {
    if (this.policy) {
      await bouncer.with(this.policy).authorize('view')
    }

    const model = this.model
    const data = model.query().where('id', request.param('id'))

    if (this.relationships && this.relationships.length > 0) {
      this.relationships.map((relationship) => {
        return data.preload(relationship)
      })
    }

    const result = await data.firstOrFail()
    return response.status(200).json(result)
  }

  public async store({ auth, request, response, bouncer }: HttpContextContract) {
    if (this.policy) {
      await bouncer.with(this.policy).authorize('create')
    }

    const model = this.model
    let data = request.all()
    if (model.$hasColumn('user_id')) {
      data = {
        ...request.all(),
        userId: auth.user ? auth.user.id : null,
      }
    }

    const result = await model.create(data)
    return response.status(201).json(result)
  }

  public async update({ auth, request, response, bouncer }: HttpContextContract) {
    const model = this.model
    const data = await model.findOrFail(request.param('id'))

    if (this.policy) {
      await bouncer.with(this.policy).authorize('update', data)
    }

    let updatedData = request.all()
    if (model.$hasColumn('user_id')) {
      updatedData = {
        ...request.all(),
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
      await bouncer.with(this.policy).authorize('delete', data)
    }

    await data.delete()
    return response.status(204)
  }

  /**
   * Get query string
   * Possible query string parameters are: sort, order, filter, page, limit
   *
   * Example for sort: sort=created_at. Default is set to created_at
   * Example for order: order=asc. Default is set to desc. Available value only asc and desc
   * Example for filter: filter=[{"field": "name", "value": "John", "operator": "like"}]. Filter can be multiple
   * Example for page: page=2
   * Example for limit: limit=10. Default is set to 10. Set to 0 for no limit
   */
  private parseQueryString(model: typeof BaseModel, qs: any) {
    const result = model.query().orderBy(qs.sort || 'created_at', qs.order || 'desc')

    if (qs.filter) {
      const parsedFilters: Filter[] = JSON.parse(qs.filter)

      parsedFilters.map((parsedFilter) => {
        return this.doWhereQuery(
          result,
          parsedFilter.field,
          parsedFilter.value,
          parsedFilter.operator
        )
      })
    }

    return result
  }

  private doWhereQuery(
    query: ModelQueryBuilderContract<LucidModel, LucidRow>,
    field: string,
    value: any,
    operator: string
  ): ModelQueryBuilderContract<LucidModel, LucidRow> {
    switch (operator) {
      case 'like':
        query.whereLike(field, `%${value}%`)
        break

      case '=':
        query.where(field, value)
        break

      case '<>':
        query.whereNot(field, value)
        break

      case '<':
        query.where(field, '<', parseInt(value))
        break

      case '>':
        query.where(field, '>', parseInt(value))
        break

      case '<=':
        query.where(field, '<=', parseInt(value))
        break

      case '>=':
        query.where(field, '>=', parseInt(value))
        break

      case 'in':
        const arrayInValue = value.split(',')
        query.whereIn(field, arrayInValue)
        break

      case 'not in':
        const arrayNotInValue = value.split(',')
        query.whereNotIn(field, arrayNotInValue)
        break

      default:
        break
    }

    return query
  }
}
