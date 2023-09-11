import { BaseModel } from '@ioc:Adonis/Lucid/Orm'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

type Filter = {
  field: string
  value: any
  operator: 'like' | '=' | '<>' | '<' | '>' | '<=' | '>=' | 'in' | 'not in'
}

export default abstract class CrudController {
  protected abstract model: typeof BaseModel
  protected relationships

  public async index({ request, response }: HttpContextContract) {
    // Require query string module
    const querystring = require('querystring')

    const model = this.model

    // Get and parse query string
    const qs = request.toJSON().query

    let processedModel = model.query()
    const pagination = {
      page: 1,
      limit: 10,
    }

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

    if (this.relationships.length > 0) {
      this.relationships.map((relationship) => {
        return processedModel.preload(relationship)
      })
    }

    const result = await processedModel.paginate(pagination.page, pagination.limit)

    if (result.length === 0) {
      return response.status(404).json({ message: 'Not Found' })
    }

    return response.status(200).json(result)
  }

  public async show({ request, response }: HttpContextContract) {
    const model = this.model
    const data = model.query().where('id', request.param('id'))

    if (this.relationships.length > 0) {
      this.relationships.map((relationship) => {
        return data.preload(relationship)
      })
    }

    const result = await data
    return response.status(200).json(result)
  }

  public async store({ request, response }: HttpContextContract) {
    const model = this.model
    const result = await model.create(request.all())
    return response.status(201).json(result)
  }

  public async update({ request, response }: HttpContextContract) {
    const model = this.model
    const data = await model.findOrFail(request.param('id'))
    data.merge(request.all())
    const result = await data.save()
    return response.status(200).json(result)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const model = this.model
    const data = await model.findOrFail(request.param('id'))
    await data.delete()
    return response.status(204)
  }

  /**
   * Get query string
   * Possible query string parameters are: sort, order, filter, page, limit
   *
   * Example for sort: sort=created_at. Default is set to created_at
   * Example for order: order=asc. Default is set to desc. Available value only asc and desc
   * Example for filter: filter={"field": "name", "value": "John", "operator": "like"}
   * Example for page: page=2
   * Example for limit: limit=10. Default is set to 10. Set to 0 for no limit
   */
  private parseQueryString(model: typeof BaseModel, qs: any) {
    const result = model.query()
    // Parse sort
    // Set created_at with desc as default value if not present
    if (qs.hasOwnProperty('sort')) {
      result.orderBy(qs.sort, qs.order)
    } else {
      result.orderBy('created_at', 'desc')
    }

    // Parse filter
    // Format of the filter is
    if (qs.hasOwnProperty('filter')) {
      const parsedFilter: Filter = JSON.parse(qs.filter)
      switch (parsedFilter.operator) {
        case 'like':
          result.whereLike(parsedFilter.field, `%${parsedFilter.value}%`)
          break

        case '=':
          result.where(parsedFilter.field, parsedFilter.value)
          break

        case '<>':
          result.whereNot(parsedFilter.field, parsedFilter.value)
          break

        case '<':
          result.where(parsedFilter.field, '<', parseInt(parsedFilter.value))
          break

        case '>':
          result.where(parsedFilter.field, '>', parseInt(parsedFilter.value))
          break

        case '<=':
          result.where(parsedFilter.field, '<=', parseInt(parsedFilter.value))
          break

        case '>=':
          result.where(parsedFilter.field, '>=', parseInt(parsedFilter.value))
          break

        case 'in':
          const arrayInValue = parsedFilter.value.split(',')
          result.whereIn(parsedFilter.field, arrayInValue)
          break

        case 'not in':
          const arrayNotInValue = parsedFilter.value.split(',')
          result.whereNotIn(parsedFilter.field, arrayNotInValue)
          break

        default:
          break
      }
    }
    return result
  }
}
