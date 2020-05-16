'use strict'

/*
|--------------------------------------------------------------------------
| RolSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class RolSeeder {
  async run () {
    await Factory.model('App/Models/Rol').create({rol: "Doctor" }) 
    await Factory.model('App/Models/Rol').create({rol: "Paciente" }) 

  }
}

module.exports = RolSeeder
