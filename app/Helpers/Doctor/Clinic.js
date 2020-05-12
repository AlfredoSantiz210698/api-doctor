/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

const ClinicModel = use('App/Models/Doctor/Clinic')

class Clinic {

    static async findByDoctorId(doctorId) {
        return await ClinicModel.query().where({
            doctor_id: doctorId
        }).first()
    }

    /**
     * Busca la clínica dado el nombre.
     * @param {Number} doctorId 
     * @param {String} clinicName 
     */
    static async findByName(doctorId, clinicName){
        return await ClinicModel.query().where({
            doctor_id: doctorId,
            name: clinicName
        }).first()
    }

    static async findByIdAndDoctorId(id, doctorId) {
        return await ClinicModel.query().where({
            id: id,
            doctor_id: doctorId
        }).first()
    }

    /**
     * Crea una nueva clínica..
     */
    static async create( inputs ){
        return await ClinicModel.create(inputs)
    }
    
    /**
     * Actualiza una nueva clínica..
     */
    static async update( clinicId, inputs ){
        delete inputs.id
        const clinic = await ClinicModel.find(clinicId)

        /**
         * Verifica si hay datos para actualizar para evitar peticiones a la base de datos.
         */
        if(  Object.keys(inputs).length === 0 ){
            return clinic;
        }

        clinic.merge(inputs)
        await clinic.save()

        return clinic;
    }
}

module.exports = Clinic
