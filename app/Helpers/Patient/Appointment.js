/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

const AppointmentModel = use('App/Models/Doctor/Appointment')

class Appointment {

    static async getAll(userId) {
        return await AppointmentModel.query().where({
            user_id: userId
        }).with('doctor', (doctor)=>{
            doctor.with('user', (user)=>{
                user.select('id', 'full_name', 'phone')
            }).with('degree')
        }).orderBy('date', 'desc').fetch()
    }


    /**
     * Crea una nueva clínica..
     */
    static async create( inputs ){
        return await AppointmentModel.create(inputs)
    }
    
}

module.exports = Appointment
