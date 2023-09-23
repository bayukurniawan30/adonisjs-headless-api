import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Setting from 'App/Models/Setting'

export default class extends BaseSeeder {
  public async run() {
    await Setting.createMany([
      {
        key: 'date-format',
        value: 'MMM D, YY',
        selectable: JSON.stringify([
          {
            key: 'MMM D, YY',
            value: 'MMM D, YY',
          },
          {
            key: 'DD/MM/YYYY',
            value: 'DD/MM/YYYY',
          },
          {
            key: 'dddd, MMMM D, YYYY',
            value: 'dddd, MMMM D, YYYY',
          },
        ]),
      },
      {
        key: 'time-format',
        value: 'h:mm A',
        selectable: JSON.stringify([
          {
            key: 'h:mm A',
            value: 'h:mm A',
          },
          {
            key: 'HH:mm',
            value: 'HH:mm',
          },
        ]),
      },
    ])
  }
}
