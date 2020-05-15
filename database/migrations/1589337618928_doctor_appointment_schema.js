'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AppointmentSchema extends Schema {
  up () {
    this.create('appointments', (table) => {
      table.increments()
      table.date('date').notNullable()
      table.time ('start').notNullable()
      table.time ('end').notNullable()
      table.text('reason').notNullable()
      
      // table.integer('user_id').notNullable().unsigned().index('user_id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')

      // table.integer('doctor_id').notNullable().unsigned().index('doctor_id')
      table.integer('doctor_id').unsigned()
      table.foreign('doctor_id').references('doctors.id')


      table.timestamps()
    })
  }

  down () {
    this.drop('appointments')
  }
}

module.exports = AppointmentSchema
