'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Reserve extends Model {
    
    static get dates() {
        return super.dates.concat(['date'])
    }

    static castDates(field, value) {
        if (field === 'date') {
          return value.format('YYYY-MM-DD')
        }
    }
}

module.exports = Reserve
