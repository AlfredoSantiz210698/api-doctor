/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

const userMessages = use('App/Helpers/Patient/Messages/User')
const patientValidator = use('App/Helpers/Patient/Validators/Patient')

const User = use('App/Helpers/Patient/User')
const Dummy = use('App/Helpers/Common/Dummy')

class UserController {

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

        const token = await Dummy.getAuthToken(auth, form.uid, form.password)
        if( !token ){
            return response.status(400).json({
                message: userMessages.emailOrPasswordNotFound
            })
        }

        const user = await User.find(form.uid);
        if( !user ){
            return response.status(400).json({
                message: userMessages.emailNotExists,
            })
        }
        
        return response.status(200).json({
            message: userMessages.welcome,
            type: token.type,
            token: token.token,
            refreshToken: token.refreshToken,
            user: user,
        })
    }

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
        form.full_name = form.full_name.toUpperCase().trim()
        const user = await User.create(form)

        /**
         * Genera el token de acceso.
         */
        const token = await auth.attempt(form.uid, form.password)

        return response.status(201).json({
            message: userMessages.accountCreatedSuccessful,
            type: token.type,
            token: token.token,
            refreshToken: token.refreshToken,
            user: user,
        })
    }


    
}

module.exports = UserController
