'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SocialNetworkSchema extends Schema {
  up () {
    this.create('social_networks', (table) => {
      table.increments()
      table.string('facebook', 150).nullable()
      table.string('twitter', 150).nullable()
      table.string('instagram', 150).nullable()
      
      table.integer('doctor_id').notNullable().unsigned().index('doctor_id')
      table.foreign('doctor_id').references('doctors.id')
      
      table.timestamps()
    })
  }

  down () {
    this.drop('social_networks')
  }
}

module.exports = SocialNetworkSchema
