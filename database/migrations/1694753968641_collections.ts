import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'collections'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name').notNullable()
      table.string('slug').notNullable().unique()
      table.jsonb('fields').notNullable()
      table.string('status', 50).notNullable().defaultTo('draft')
      table.boolean('is_connecting').notNullable().defaultTo(false)
      table.string('sorting').notNullable().defaultTo('created_at')
      table.string('ordering').notNullable().defaultTo('desc')
      table.uuid('user_id').references('users.id').onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
