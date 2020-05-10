/**
 * @author José Alfredo Gómez Sántiz
 */

 'use strict'

const doctorMessages = use('App/Helpers/Doctor/Messages/Doctor')
const doctorValidator = use('App/Helpers/Doctor/Validators/Doctor')
const Doctor = use('App/Helpers/Doctor/Doctor')

class DoctorController {

    async update ({ request, response, auth }) {
        const form = request.all();

        const formValidator = await doctorValidator.update( form )
        if ( formValidator.fails() ) {
            return response.status(400).json({
                message: formValidator.messages()[0].message,
                validator: formValidator.messages()
            })
        }

        const updatedDoctor = await Doctor.update(auth.user.id, form);

        return response.status(200).json({
            ...{
                message: doctorMessages.updatedSuccessful
            },
            ...updatedDoctor.toJSON()
        })
    }

}

module.exports = DoctorController
