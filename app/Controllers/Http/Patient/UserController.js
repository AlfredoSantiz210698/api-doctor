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
        const inputs = request.only([
            'uid',
            'password'
        ])

        /**
         * Valida los parámetros necesarios para crear el doctor.
         */
        const inputsValidator = await patientValidator.login( inputs )
        if ( inputsValidator.fails() ) {
            return response.status(400).json({
                message: inputsValidator.messages()[0].message,
                validator: inputsValidator.messages()
            })
        }

        const token = await Dummy.getAuthToken(auth, inputs.uid, inputs.password)
        if( !token ){
            return response.status(400).json({
                message: userMessages.emailOrPasswordNotFound
            })
        }

        const user = await User.find(inputs.uid);
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

        const inputs = request.only([
            'uid',
            'password',
            'full_name',
            'phone'
        ])
        
        /**
         * Valida los parámetros necesarios para crear el doctor.
         */
        const inputsValidator = await patientValidator.signup( inputs )
        if ( inputsValidator.fails() ) {
            return response.status(400).json({
                message: inputsValidator.messages()[0].message,
                validator: inputsValidator.messages()
            })
        }

        /**
         * Crea el usuario.
         */
        inputs.full_name = inputs.full_name.toUpperCase().trim()
        const user = await User.create(inputs)

        /**
         * Genera el token de acceso.
         */
        const token = await auth.attempt(inputs.uid, inputs.password)

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
