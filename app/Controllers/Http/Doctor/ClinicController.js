/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

const clinicMessages = use('App/Helpers/Doctor/Messages/Clinic')
const clinicValidator = use('App/Helpers/Doctor/Validators/Clinic')

const Clinic = use('App/Helpers/Doctor/Clinic')
const Doctor = use('App/Helpers/Doctor/Doctor')

class ClinicController {
    
    async getByDoctorId ({ params, response }) {

        const clinic = await Clinic.findByDoctorId(params.id)
        if( !clinic ){
            return response.status(404).json({
                message: clinicMessages.notFound
            })
        }
        
        return response.status(200).json({
            message: clinicMessages.get,
            clinic: clinic
        })
    }

    async create ({ request, response, auth }) {
        const inputs = request.only([
            'name',
            'phone',
            'latitude',
            'longitude',
            'open',
            'close',
            'appointment_duration',
            'payment_methods',
        ])

        const inputsValidator = await clinicValidator.create( inputs )
        if ( inputsValidator.fails() ) {
            return response.status(400).json({
                message: inputsValidator.messages()[0].message,
                validator: inputsValidator.messages()
            })
        }   

        const doctor = await Doctor.findByUserId(auth.user.id)
        
        /**
         * Verifica si el doctor tiene alguna clínica.
         */
        if( await Clinic.findByDoctorId(doctor.id)) {
            return response.status(400).json({
                message: clinicMessages.exists
            });
        }


        /*
         * Descomentar si el requerimiento es tener más de una clínica.
         * /**
         *  * Verificar si existe alguna clínica con el mismo nombre.
         *  *
         * if( await Clinic.findByName(doctor.id, inputs.name) ){
         *     return response.status(400).json({
         *         message: clinicMessages.exists(inputs.name)
         *     })
         * }
         */

        /**
         * Crear clínica.
         */
        inputs.doctor_id = doctor.id;
        const clinic = await Clinic.create(inputs);
        
        return response.status(201).json({
            message: clinicMessages.created,
            clinic: clinic
        })
    }

    async update ({ request, response, auth }) {
        const inputs = request.only([
            'id',
            'name',
            'phone',
            'latitude',
            'longitude',
            'open',
            'close',
            'appointment_duration',
            'payment_methods',
        ])

        const inputsValidator = await clinicValidator.update( inputs )
        if ( inputsValidator.fails() ) {
            return response.status(400).json({
                message: inputsValidator.messages()[0].message,
                validator: inputsValidator.messages()
            })
        }  

        const doctor = await Doctor.findByUserId(auth.user.id)

        /**
         * Verifica si realmente la clínica le pertenece al doctor logueado.
         */
        const clinic = await Clinic.findByIdAndDoctorId(inputs.id, doctor.id);
        if( !clinic ) {
            return response.status(404).json({
                message: clinicMessages.notFound
            })
        }

        const clinicUpdated = await Clinic.update(clinic.id, inputs)

        return response.status(200).json({
            message: clinicMessages.updated,
            clinicUpdated: clinicUpdated
        })
    }
}

module.exports = ClinicController
