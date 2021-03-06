'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Appointment extends Model {
    static get dates() {
        return super.dates.concat(['date'])
    }
      
    static castDates(field, value) {
        if (field === 'date') {
          return value.format('YYYY-MM-DD')
        }
    }

    doctor () {
        return this.hasOne('App/Models/Doctor/Doctor', 'doctor_id', 'id')
    }

    patient () {
        return this.hasOne('App/Models/User', 'user_id', 'id')
    }

}

module.exports = Appointment
