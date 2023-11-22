import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'medias'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('type').notNullable()
      table.integer('size').notNullable()
      table.string('url').notNullable()
      table.string('thumbnail_url').nullable()
      table.integer('width').nullable()
      table.integer('height').nullable()
      table.string('ref_id').nullable()
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
