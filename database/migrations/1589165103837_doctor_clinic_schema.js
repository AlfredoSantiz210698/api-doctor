'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClinicSchema extends Schema {
  up () {
    this.create('clinics', (table) => {
      table.increments()
      
      table.string('name', 150).notNullable()
      table.string('phone', 100).notNullable()
      table.float('latitude').notNullable()
      table.float('longitude').notNullable()
      table.time ('open').notNullable()
      table.time ('close').notNullable()
      table.integer('appointment_duration').notNullable()
      table.text('payment_methods').nullable()
      
      table.integer('doctor_id').notNullable().unsigned().index('doctor_id')
      table.foreign('doctor_id').references('doctors.id')

      table.timestamps()
    })
  }

  down () {
    this.drop('clinics')
  }
}

module.exports = ClinicSchema
