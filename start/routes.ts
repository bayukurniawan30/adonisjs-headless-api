/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  // Route.resource('users', 'UsersController')

  Route.post('/login', 'AuthController.login')

  Route.group(() => {
    // User account related routes
    Route.get('/me', 'AuthController.me')
    Route.get('/logout', 'AuthController.logout')

    Route.resource('users', 'UsersController').apiOnly()
    Route.resource('medias', 'MediasController').except(['update']).apiOnly()
    Route.resource('collections', 'CollectionsController').apiOnly()
    Route.get('/collections/:id/items', 'CollectionsController.items')
    Route.resource('singletons', 'SingletonsController').apiOnly()
    Route.get('/singletons/:id/item', 'SingletonsController.item')
    Route.post('/singletons/:id/item', 'SingletonsController.addItem')
    Route.put('/singletons/:id/item/:itemId', 'SingletonsController.updateItem')
    Route.resource('available-fields', 'AvailableFieldsController')
    Route.resource('settings', 'SettingsController').apiOnly().only(['index', 'show', 'update'])
  }).middleware('auth')
}).prefix('api')
