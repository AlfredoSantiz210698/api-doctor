/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

const DoctorModel = use('App/Models/Doctor/Doctor')

class Doctor {

    
    
    static async getByDegree( degreeId ){
        return await DoctorModel.query().where({
            degree_id: degreeId
        }).with('degree').with('user', (user)=>{
            user.select('id', 'full_name', 'phone')
        }).with('clinic', (clinic)=>{
            clinic.select('latitude', 'longitude', 'doctor_id')
        }).fetch();
    }

    static async findByUserId( userId ){
        return await DoctorModel.findBy('user_id', userId);
    }

    /**
     * Crea un nuevo doctor.
     * @param {Object} form Atributos del doctor.
     */
    static async create( form ){
        return await DoctorModel.create({
            user_id: form.user_id,
            degree_id: form.degree_id,
            institution: form.institution
        })
    }

    /**
     * Actualiza los datos del doctor.
     */
    static async update(userId, inputs) {

        const doctor = await DoctorModel.findBy('user_id', userId)

        /**
         * Verifica si hay datos para actualizar para evitar peticiones a la base de datos.
         */
        if(  Object.keys(inputs).length === 0 ){
            return doctor;
        }

        doctor.merge(inputs)
        await doctor.save()

        return doctor;
    }
    
}

module.exports = Doctor
