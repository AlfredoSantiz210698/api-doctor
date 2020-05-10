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

    degree () {
        return this.hasOne('App/Models/Doctor/Degree', 'degree_id', 'id')
    }
}

module.exports = Doctor
