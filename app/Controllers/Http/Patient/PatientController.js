/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

const patientValidator = use('App/Helpers/Validators/Patient')

const User = use('App/Helpers/User')
const Patient = use('App/Helpers/Patient/Patient')


class PatientController {

    async signup ({ request, response, auth }) {
        const form = request.all()

        /**
         * Valida los parámetros necesarios para crear el doctor.
         */
        const formValidator = await patientValidator.signup( form )
        if ( formValidator.fails() ) {
            return response.status(400).json({
                message: formValidator.messages()[0].message,
                validator: formValidator.messages()
            })
        }

        /**
         * Crea el usuario.
         */
        form.role_id = 2;
        form.full_name = form.full_name.toUpperCase().trim()
        const user = await User.create(form)

        /**
         * Genera el token de acceso.
         */
        const token = await auth.attempt(form.uid, form.password)

        return response.status(201).json({
            type: token.type,
            token: token.token,
            refreshToken: token.refreshToken,
            user: user,
        })
    }


    async login ({ request, response, auth }) {
        const form = request.all()

        /**
         * Valida los parámetros necesarios para crear el doctor.
         */
        const formValidator = await patientValidator.login( form )
        if ( formValidator.fails() ) {
            return response.status(400).json({
                message: formValidator.messages()[0].message,
                validator: formValidator.messages()
            })
        }

        try {
            const token = await auth.attempt(form.uid, form.password)

            const user = await Patient.find(form.uid);
            if(!user){
                return response.status(400).json({
                    message: "El email no se encuentra en nuestros registros, debes registrarte para tener acceso a la aplicación.",
                })
            }
            
            return response.status(200).json({
                type: token.type,
                token: token.token,
                refreshToken: token.refreshToken,
                user: user,
            })
        } catch (error) {
            return response.status(400).json({
                message: "El email o contraseña ingresada es inválida."
            })
        }
    }
}

module.exports = PatientController
