'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DoctorSchema extends Schema {
  up () {
    this.create('doctors', (table) => {
      table.increments()
      table.string('photo', 254).nullable()
      table.string('institution', 150).nullable()
      table.text('semblance').nullable()

      table.integer('user_id').notNullable().unsigned().index('user_id')
      table.foreign('user_id').references('users.id')

      table.integer('degree_id').notNullable().unsigned().index('degree_id')
      table.foreign('degree_id').references('degrees.id')

      table.timestamps()
    })
  }

  down () {
    this.drop('doctors')
  }
}

module.exports = DoctorSchema
