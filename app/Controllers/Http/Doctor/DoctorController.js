/**
 * @author José Alfredo Gómez Sántiz
 */

 'use strict'

const doctorMessages = use('App/Helpers/Doctor/Messages/Doctor')
const doctorValidator = use('App/Helpers/Doctor/Validators/Doctor')
const Doctor = use('App/Helpers/Doctor/Doctor')

class DoctorController {

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
