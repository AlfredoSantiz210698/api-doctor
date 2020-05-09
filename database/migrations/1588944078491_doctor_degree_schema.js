'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DegreeSchema extends Schema {
  up () {
    this.create('degrees', (table) => {
      table.increments()
      table.string('name', 150).notNullable().unique()
      // table.timestamps()
    })
  }

  down () {
    this.drop('degrees')
  }
}

module.exports = DegreeSchema
