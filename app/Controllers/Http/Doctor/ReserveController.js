'use strict'

const reserveMessages = use('App/Helpers/Doctor/Messages/Reserve')
const reservetValidator = use('App/Helpers/Doctor/Validators/Reserve')

const Reserve = use('App/Helpers/Doctor/Reserve')
const Doctor = use('App/Helpers/Doctor/Doctor')

class ReserveController {
    
    async get ({ request, params, response, auth }) {
        const inputs = request.only([ 'date' ])

        const inputsValidator = await reservetValidator.getByDate( inputs )
        if ( inputsValidator.fails() ) {
            return response.status(400).json({
                message: inputsValidator.messages()[0].message,
                validator: inputsValidator.messages()
            })
        }  

        const doctor = await Doctor.findByUserId(auth.user.id)
        const reserves = await Reserve.getByDate(doctor.id, inputs.date);

        return response.status(200).json({
            message: reserveMessages.getByDate(inputs.date),
            reserves: reserves
        })
    }

    async getByDoctorIdDate ({ request, params, response }) {
        const inputs = request.only([ 'date' ])

        const inputsValidator = await reservetValidator.getByDate( inputs )
        if ( inputsValidator.fails() ) {
            return response.status(400).json({
                message: inputsValidator.messages()[0].message,
                validator: inputsValidator.messages()
            })
        }  

        const reserves = await Reserve.getByDate(params.id, inputs.date);

        return response.status(200).json({
            message: reserveMessages.getByDate(inputs.date),
            reserves: reserves
        })
    }

    async create ({ request, response, auth }) {
        const inputs = request.only([
            'date',
            'start',
            'end'
        ])

        const inputsValidator = await reservetValidator.create( inputs )
        if ( inputsValidator.fails() ) {
            return response.status(400).json({
                message: inputsValidator.messages()[0].message,
                validator: inputsValidator.messages()
            })
        }   

        const doctor = await Doctor.findByUserId(auth.user.id)
        
        inputs.doctor_id = doctor.id;
        const reserve = await Reserve.create(inputs);

        return response.status(201).json({
            message: reserveMessages.created,
            reserve: reserve
        })
    }
}

module.exports = ReserveController
