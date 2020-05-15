/**
 * @author José Alfredo Gómez Sántiz
 */

 'use strict'

const doctorMessages = use('App/Helpers/Doctor/Messages/Doctor')
const degreeMessages = use('App/Helpers/Doctor/Messages/Degree')

const doctorValidator = use('App/Helpers/Doctor/Validators/Doctor')

const Doctor = use('App/Helpers/Doctor/Doctor')
const Degree = use('App/Helpers/Doctor/Degree')

class DoctorController {

    async getByDegree ({ params, response }) {
        const degree = await Degree.findById(params.id);
        if( !degree ) {
            return response.status(400).json({
                message: degreeMessages.notFound,
            })
        }

        const doctors = await Doctor.getByDegree(degree.id);

        return response.status(200).json({
            message: doctorMessages.getByDegree(degree.name),
            doctors: doctors
        })
    }

    async update ({ request, response, auth }) {

        const inputs = request.only([
            'photo',
            'semblance'
        ])

        const inputsValidator = await doctorValidator.update( inputs )
        if ( inputsValidator.fails() ) {
            return response.status(400).json({
                message: inputsValidator.messages()[0].message,
                validator: inputsValidator.messages()
            })
        }

        const updatedDoctor = await Doctor.update(auth.user.id, inputs);

        return response.status(200).json({
            message: doctorMessages.updatedSuccessful,
            updatedDoctor: updatedDoctor
        })
    }

}

module.exports = DoctorController
