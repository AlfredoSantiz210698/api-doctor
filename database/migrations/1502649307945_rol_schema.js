'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RolSchema extends Schema {
  up () {
    this.create('roles', (table) => {
      table.increments()
      table.string('name', 30).notNullable()
      // table.timestamps()
    })
  }

  down () {
    this.drop('roles')
  }
}

module.exports = RolSchema
