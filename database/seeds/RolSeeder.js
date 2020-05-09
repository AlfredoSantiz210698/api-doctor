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
const Rol = use('App/Models/Rol')

class RolSeeder {
  async run () {
    await Rol.create({
      name: "Doctor"
    })

    await Rol.create({
      name: "Paciente"
    })
  }
}

module.exports = RolSeeder
