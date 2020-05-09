'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('uid', 100).nullable().unique()
      table.string('password', 254).notNullable()
      table.string('full_name', 100).notNullable()
      table.string('phone', 100).notNullable()
      
      table.integer('role_id').notNullable().unsigned().index('role_id')
      table.foreign('role_id').references('roles.id')
      
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
