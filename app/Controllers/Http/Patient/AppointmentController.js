'use strict'

const appointmentMessages = use('App/Helpers/Patient/Messages/Appointment')
const appointmentValidator = use('App/Helpers/Patient/Validators/Appointment')

const Appointment = use('App/Helpers/Patient/Appointment')

class AppointmentController {

    async get ({ response, auth }) {

        const appointments = await Appointment.getAll(auth.user.id);

        return response.status(200).json({
            message: appointmentMessages.get,
            appointments: appointments
        })
    }


    async create ({ request, response, auth }) {

        const inputs = request.only([
            'date',
            'start',
            'end',
            'reason',
            'doctor_id'
        ])

        const inputsValidator = await appointmentValidator.create( inputs )
        if ( inputsValidator.fails() ) {
            return response.status(400).json({
                message: inputsValidator.messages()[0].message,
                validator: inputsValidator.messages()
            })
        }   
        
        inputs.user_id = auth.user.id;
        const appointment = await Appointment.create(inputs);
        
        return response.status(201).json({
            message: appointmentMessages.created,
            appointment: appointment
        })
    }
}

module.exports = AppointmentController
