import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Setting from 'App/Models/Setting'

export default class extends BaseSeeder {
  public async run() {
    await Setting.createMany([
      {
        key: 'date-format',
        value: 'MMM D, YY',
      },
      {
        key: 'time-format',
        value: 'h:mm A',
      },
    ])
  }
}
