import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import AvailableField from 'App/Models/AvailableField'
import { string } from '@ioc:Adonis/Core/Helpers'

export default class extends BaseSeeder {
  public async run() {
    await AvailableField.createMany([
      {
        name: 'Boolean',
        slug: string.dashCase('Boolean'),
        additionalText: 'True or false',
      },
      {
        name: 'Color Picker',
        slug: string.dashCase('Color Picker'),
        additionalText: 'Pick a color',
      },
      {
        name: 'Date Picker',
        slug: string.dashCase('Date Picker'),
        additionalText: 'Pick a date',
        metadata: {
          dateFormat: 'yyyy-mm-dd',
        },
      },
      {
        name: 'Time Picker',
        slug: string.dashCase('Time Picker'),
        additionalText: 'Pick a time',
      },
      {
        name: 'Code Editor',
        slug: string.dashCase('Code Editor'),
        additionalText: 'Enter some code',
      },
      {
        name: 'Image',
        slug: string.dashCase('Image'),
        additionalText: 'Upload or choose existing media image',
      },
      {
        name: 'Link',
        slug: string.dashCase('Link'),
        additionalText: 'Enter a link',
        metadata: {
          target: ['_self', '_blank'],
        },
      },
      {
        name: 'Number',
        slug: string.dashCase('Number'),
        additionalText: 'Enter a number',
        metadata: {
          min: 0,
          max: 100,
          step: 1,
        },
      },
      {
        name: 'Password',
        slug: string.dashCase('Password'),
        additionalText: '',
        metadata: {
          minLength: 6,
          maxLength: 20,
        },
      },
      {
        name: 'Selectbox',
        slug: string.dashCase('Selectbox'),
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
        slug: string.dashCase('Text Input'),
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
        slug: string.dashCase('Textarea'),
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
