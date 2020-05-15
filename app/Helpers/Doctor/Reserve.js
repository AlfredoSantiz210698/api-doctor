/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

const ReserveModel = use('App/Models/Doctor/Reserve')

class Reserve {

    static async getByDate(doctorId, date) {
        return await ReserveModel.query().where({
            doctor_id: doctorId,
            date: date
        }).fetch()
    }

    /**
     * Crea una nueva reserva.
     */
    static async create( inputs ){

        return await ReserveModel.create(inputs)
    }
    
}

module.exports = Reserve
