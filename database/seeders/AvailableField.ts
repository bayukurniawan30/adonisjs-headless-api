import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import AvailableField from 'App/Models/AvailableField'

export default class extends BaseSeeder {
  public async run() {
    await AvailableField.createMany([
      {
        name: 'Boolean',
        additionalText: 'True or false',
      },
      {
        name: 'Color Picker',
        additionalText: 'Pick a color',
      },
      {
        name: 'Date Picker',
        additionalText: 'Pick a date',
        metadata: {
          dateFormat: 'yyyy-mm-dd',
        },
      },
      {
        name: 'Time Picker',
        additionalText: 'Pick a time',
      },
      {
        name: 'Code Editor',
        additionalText: 'Enter some code',
      },
      {
        name: 'Image',
        additionalText: 'Upload or choose existing media image',
      },
      {
        name: 'Link',
        additionalText: 'Enter a link',
        metadata: {
          target: ['_self', '_blank'],
        },
      },
      {
        name: 'Number',
        additionalText: 'Enter a number',
        metadata: {
          min: 0,
          max: 100,
          step: 1,
        },
      },
      {
        name: 'Password',
        additionalText: '',
        metadata: {
          minLength: 6,
          maxLength: 20,
        },
      },
      {
        name: 'Selectbox',
        additionalText: '',
        metadata: {
          fields: [
            {
              label: 'Option 1',
              value: '1',
            },
            {
              label: 'Option 2',
              value: '2',
            },
          ],
        },
      },
      {
        name: 'Text Input',
        additionalText: '',
        metadata: {
          placeholder: '',
          minLength: 1,
          maxLength: 200,
          type: 'text',
        },
      },
      {
        name: 'Textarea',
        additionalText: '',
        metadata: {
          placeholder: '',
          minLength: 1,
          maxLength: 200,
          rows: 5,
        },
      },
    ])
  }
}
