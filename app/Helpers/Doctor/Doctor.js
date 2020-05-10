/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

const DoctorModel = use('App/Models/Doctor/Doctor')

class Doctor {

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
    static async update(userId, form) {
        let dataUpdateDoctor = {};

        /**
         * Verifica si el usuario ha envíado datos para actualizar.
         */
        if(form.photo !== undefined){
            dataUpdateDoctor.photo = form.photo
        }

        if(form.semblance !== undefined){
            dataUpdateDoctor.semblance = form.semblance
        }

        const doctor = await DoctorModel.findBy('user_id', userId)

        /**
         * Verifica si hay datos para actualizar. Principalmente se hace 
         * esta verificación para no hacer peticiones a la base de datos sin
         * actualizar algo.
         */
        if(  Object.keys(dataUpdateDoctor).length === 0 ){
            return doctor;
        }

        doctor.merge(dataUpdateDoctor)
        await doctor.save()

        return doctor;
    }
    
}

module.exports = Doctor
