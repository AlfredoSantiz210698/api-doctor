/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

const axios = require("axios")

const userMessages = use('App/Helpers/Doctor/Messages/User')
const userValidator = use('App/Helpers/Doctor/Validators/User')

const User = use('App/Helpers/Doctor/User')
const Doctor = use('App/Helpers/Doctor/Doctor')
const Degree = use('App/Helpers/Doctor/Degree')
const Profile = use('App/Helpers/Doctor/Profile')
const Dummy = use('App/Helpers/Common/Dummy')

class UserController {

    async login ({ request, response, auth }) {
        const form = request.all()

        /**
         * Valida los parámetros necesarios para crear el doctor.
         */
        const formValidator = await userValidator.login( form )
        if ( formValidator.fails() ) {
            return response.status(400).json({
                message: formValidator.messages()[0].message,
                validator: formValidator.messages()
            })
        }

        const token = await Dummy.getAuthToken(auth, form.uid, form.password)
        if( !token ){
            return response.status(400).json({
                message: userMessages.uidOrPasswordNotFound
            })
        }

        const user = await User.find(form.uid);
        if( !user ){
            return response.status(400).json({
                message: userMessages.uidNotExists
            })
        }

        const profileInfo = await Profile.get( user.id )

        return response.status(200).json({
            message: userMessages.welcome,
            type: token.type,
            token: token.token,
            refreshToken: token.refreshToken,
            user: profileInfo,
        })
    }


    async signup ({ request, response, auth }) {
        const form = request.all()

        /**
         * Valida los parámetros necesarios para crear el doctor.
         */
        const formValidator = await userValidator.signup( form )
        if ( formValidator.fails() ) {
            return response.status(400).json({
                message: formValidator.messages()[0].message,
                validator: formValidator.messages()
            })
        }

        const url = `http://search.sep.gob.mx/solr/cedulasCore/select?fl=*,score&q=${form.uid}&start=0&rows=100&facet=true&indent=on&wt=json`;
        
        /**
         * Petición para obtener la información del doctor dado la cédula.
         */
        const infoCedula = await axios.get(url).then(response => {
            return response.data.response.docs[0];
        }).catch(error => {
            return response.status(400).json({
                message: userMessages.failedLicenseRequest
            })
        });

        if( !infoCedula ) {
            return response.status(400).json({
                message: userMessages.licenseNotFound
            })
        }

        // /**
        //  * Verifica que el nombre ingresado coincida con la información
        //  * de la cédula.
        //  */
        // const sepNombreDoctor = `${infoCedula.nombre} ${infoCedula.paterno} ${infoCedula.materno}`;
        // form.full_name = form.full_name.toUpperCase().trim()

        // if( form.full_name != sepNombreDoctor ){
        //     return response.status(400).json({
        //         message: "El nombre ingresado no coincide con la información de la cédula."
        //     })
        // }

        // /**
        //  * Verifica que la institución ingresado coincida con la información
        //  * de la cédula.
        //  */
        // form.institution = form.institution.toUpperCase().trim()
        
        // if( form.institution != infoCedula.institucion ){
        //     return response.status(400).json({
        //         message: "La institución ingresado no coincide con la información de la cédula."
        //     })
        // }

        let degree = await Degree.find(infoCedula.titulo);
        if( !degree ){
            degree = await Degree.create(infoCedula.titulo);
        }
        
        /**
         * Crea el usuario.
         */
        form.full_name =  `${infoCedula.nombre} ${infoCedula.paterno} ${infoCedula.materno}`;
        const user = await User.create(form)

        /**
         * Crea el doctor.
         */
        await Doctor.create({
            user_id: user.id,
            degree_id: degree.id,
            institution: infoCedula.institucion
        })

        /**
         * Genera el token de acceso.
         */
        const token = await auth.attempt(form.uid, form.password)
        const profileInfo = await Profile.get( user.id )

        return response.status(201).json({
            message: userMessages.accountCreatedSuccessful,
            type: token.type,
            token: token.token,
            refreshToken: token.refreshToken,
            user: profileInfo
        })
    }

    // async getAll ({ request, response }) {
    //     const doctors = await Doctor.getAll();
    //     return response.status(200).json(doctors)
    // }

}

module.exports = UserController
