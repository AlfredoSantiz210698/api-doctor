'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReserveSchema extends Schema {
  up () {
    this.create('reserves', (table) => {
      table.increments()
      table.date('date').notNullable()
      table.time ('start').nullable()
      table.time ('end').nullable()
      
      table.integer('doctor_id').notNullable().unsigned().index('doctor_id')
      table.foreign('doctor_id').references('doctors.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('reserves')
  }
}

module.exports = ReserveSchema
