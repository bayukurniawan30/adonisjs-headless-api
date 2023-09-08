import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserFactory from 'Database/factories/UserFactory'

export default class extends BaseSeeder {
  public async run() {
    await UserFactory.merge({
      email: 'admin@example.com',
      password: 'secret',
    })
      .with('profile')
      .create()

    await UserFactory.merge({
      email: 'user@example.com',
      password: 'secret',
    })
      .with('profile')
      .create()
  }
}
