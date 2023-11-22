"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CrudController {
    async index({ request, response, bouncer }) {
        if (this.policy) {
            await bouncer.with(this.policy).authorize('viewList');
        }
        const querystring = require('querystring');
        const model = this.model;
        const qs = request.toJSON().query;
        let processedModel = model.query();
        const pagination = {
            page: 1,
            limit: 10,
        };
        if (qs && qs.length > 0) {
            const parsedQs = querystring.parse(qs);
            const qsObject = JSON.parse(JSON.stringify(parsedQs));
            processedModel = this.parseQueryString(model, qsObject);
            if (qsObject.hasOwnProperty('page') && qsObject.hasOwnProperty('limit')) {
                const page = parseInt(qsObject.page);
                const limit = parseInt(qsObject.limit);
                pagination.page = page;
                if (limit === 0) {
                    pagination.page = 1;
                    pagination.limit = 9999999;
                }
                else {
                    pagination.limit = limit;
                }
            }
        }
        if (this.relationships && this.relationships.length > 0) {
            this.relationships.map((relationship) => {
                return processedModel.preload(relationship);
            });
        }
        const result = await processedModel.paginate(pagination.page, pagination.limit);
        return response.status(200).json(result);
    }
    async show({ request, response, bouncer }) {
        if (this.policy) {
            await bouncer.with(this.policy).authorize('view');
        }
        const model = this.model;
        const data = model.query().where('id', request.param('id'));
        if (this.relationships && this.relationships.length > 0) {
            this.relationships.map((relationship) => {
                return data.preload(relationship);
            });
        }
        const result = await data.firstOrFail();
        return response.status(200).json(result);
    }
    async store({ auth, request, response, bouncer }) {
        if (this.policy) {
            await bouncer.with(this.policy).authorize('create');
        }
        const model = this.model;
        let data = request.all();
        if (model.$hasColumn('user_id')) {
            data = {
                ...request.all(),
                userId: auth.user ? auth.user.id : null,
            };
        }
        const result = await model.create(data);
        return response.status(201).json(result);
    }
    async update({ auth, request, response, bouncer }) {
        if (this.policy) {
            await bouncer.with(this.policy).authorize('update');
        }
        const model = this.model;
        const data = await model.findOrFail(request.param('id'));
        let updatedData = request.all();
        if (model.$hasColumn('user_id')) {
            updatedData = {
                ...request.all(),
                userId: auth.user ? auth.user.id : null,
            };
        }
        data.merge(updatedData);
        const result = await data.save();
        return response.status(200).json(result);
    }
    async destroy({ request, response, bouncer }) {
        if (this.policy) {
            await bouncer.with(this.policy).authorize('delete');
        }
        const model = this.model;
        const data = await model.findOrFail(request.param('id'));
        await data.delete();
        return response.status(204);
    }
    parseQueryString(model, qs) {
        const result = model.query().orderBy(qs.sort || 'created_at', qs.order || 'desc');
        if (qs.filter) {
            const parsedFilters = JSON.parse(qs.filter);
            parsedFilters.map((parsedFilter) => {
                return this.doWhereQuery(result, parsedFilter.field, parsedFilter.value, parsedFilter.operator);
            });
        }
        return result;
    }
    doWhereQuery(query, field, value, operator) {
        switch (operator) {
            case 'like':
                query.whereLike(field, `%${value}%`);
                break;
            case '=':
                query.where(field, value);
                break;
            case '<>':
                query.whereNot(field, value);
                break;
            case '<':
                query.where(field, '<', parseInt(value));
                break;
            case '>':
                query.where(field, '>', parseInt(value));
                break;
            case '<=':
                query.where(field, '<=', parseInt(value));
                break;
            case '>=':
                query.where(field, '>=', parseInt(value));
                break;
            case 'in':
                const arrayInValue = value.split(',');
                query.whereIn(field, arrayInValue);
                break;
            case 'not in':
                const arrayNotInValue = value.split(',');
                query.whereNotIn(field, arrayNotInValue);
                break;
            default:
                break;
        }
        return query;
    }
}
exports.default = CrudController;
//# sourceMappingURL=CrudController.js.map