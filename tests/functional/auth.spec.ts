import { test } from '@japa/runner'
import UserFactory from 'Database/factories/UserFactory'

test.group('Auth', () => {
  test('can login user with valid credentials', async ({ client, assert }) => {
    const user = await UserFactory.merge({ password: 'secret' }).create()

    const response = await client.post('/api/login').json({
      email: user.email,
      password: 'secret',
    })

    const result = JSON.parse(response.text())

    response.assertStatus(200)
    assert.equal(result.user.email, user.email)
  })

  test('cannot login user with invalid credentials', async ({ client }) => {
    const user = await UserFactory.merge({ password: 'secret' }).create()

    const response = await client.post('/api/login').json({
      email: user.email,
      password: 'secretss',
    })

    response.assertStatus(400)
  })
})
