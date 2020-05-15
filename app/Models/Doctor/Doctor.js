'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Doctor extends Model {
    static get hidden () {
        return [
          'password',
          'created_at',
          'updated_at'
        ]
    }

    user () {
        return this.hasOne('App/Models/User', 'user_id', 'id')
    }

    degree () {
        return this.hasOne('App/Models/Doctor/Degree', 'degree_id', 'id')
    }

    clinic () {
        return this.hasOne('App/Models/Doctor/Clinic', 'id', 'doctor_id')
    }

}

module.exports = Doctor
