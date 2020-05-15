'use strict'

const appointmentMessages = use('App/Helpers/Doctor/Messages/Appointment')
const appointmentValidator = use('App/Helpers/Doctor/Validators/Appointment')


const Doctor = use('App/Helpers/Doctor/Doctor')
const Appointment = use('App/Helpers/Doctor/Appointment')
const PatientUser = use('App/Helpers/Patient/User')

class AppointmentController {
    
    async getByDoctorIdDate ({ request, params, response, auth }) {
        const inputs = request.only([ 'date' ])

        const inputsValidator = await appointmentValidator.getByDate( inputs )
        if ( inputsValidator.fails() ) {
            return response.status(400).json({
                message: inputsValidator.messages()[0].message,
                validator: inputsValidator.messages()
            })
        }  

        const appointments = await Appointment.getByDate(params.id, inputs.date);

        return response.status(200).json({
            message: appointmentMessages.getByDate(inputs.date),
            appointments: appointments
        })
    }

    async getByDate ({ request, params, response, auth }) {
        const inputs = request.only([ 'date' ])

        const inputsValidator = await appointmentValidator.getByDate( inputs )
        if ( inputsValidator.fails() ) {
            return response.status(400).json({
                message: inputsValidator.messages()[0].message,
                validator: inputsValidator.messages()
            })
        }  

        const doctor = await Doctor.findByUserId(auth.user.id)
        const appointments = await Appointment.getAllByDate(doctor.id, inputs.date);

        return response.status(200).json({
            message: appointmentMessages.getByDate(inputs.date),
            appointments: appointments
        })
    }

    async create ({ request, response, auth }) {

        // Falta 
        // validar 
        // que la 
        // fehca de la cita 
        // no esté ocupado

        const inputs = request.only([
            'date',
            'start',
            'end',
            'reason',
            'full_name',
            'phone'
        ])

        const inputsValidator = await appointmentValidator.create( inputs )
        if ( inputsValidator.fails() ) {
            return response.status(400).json({
                message: inputsValidator.messages()[0].message,
                validator: inputsValidator.messages()
            })
        }   

        
        let patientUser = await PatientUser.findByNamePhone(inputs.full_name, inputs.phone);

        if( !patientUser ) {

            patientUser = await PatientUser.createPatient({
                full_name: inputs.full_name,
                phone: inputs.phone
            })

        }

        const doctor = await Doctor.findByUserId(auth.user.id)
        
        inputs.doctor_id = doctor.id;
        inputs.user_id = patientUser.id;
        const appointment = await Appointment.create(inputs);
        
        return response.status(201).json({
            message: appointmentMessages.created,
            appointment: appointment
        })
    }
}

module.exports = AppointmentController
