'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Appointment extends Model {
    patient () {
        return this.hasOne('App/Models/User', 'user_id', 'id')
    }

}

module.exports = Appointment
