/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

const AppointmentModel = use('App/Models/Doctor/Appointment')

class Appointment {

    static async getByDate(doctorId, date) {
        return await AppointmentModel.query().where({
            doctor_id: doctorId,
            date: date
        }).with('patient').fetch()
    }

    // /**
    //  * Busca la clínica dado el nombre.
    //  * @param {Number} doctorId 
    //  * @param {String} clinicName 
    //  */
    // static async findByName(doctorId, clinicName){
    //     return await AppointmentModel.query().where({
    //         doctor_id: doctorId,
    //         name: clinicName
    //     }).first()
    // }

    // static async findByIdAndDoctorId(id, doctorId) {
    //     return await AppointmentModel.query().where({
    //         id: id,
    //         doctor_id: doctorId
    //     }).first()
    // }

    /**
     * Crea una nueva clínica..
     */
    static async create( inputs ){
        delete inputs.full_name
        delete inputs.phone

        return await AppointmentModel.create(inputs)
    }
    
    // /**
    //  * Actualiza una nueva clínica..
    //  */
    // static async update( clinicId, inputs ){
    //     delete inputs.id
    //     const clinic = await AppointmentModel.find(clinicId)

    //     /**
    //      * Verifica si hay datos para actualizar para evitar peticiones a la base de datos.
    //      */
    //     if(  Object.keys(inputs).length === 0 ){
    //         return clinic;
    //     }

    //     clinic.merge(inputs)
    //     await clinic.save()

    //     return clinic;
    // }
}

module.exports = Appointment
