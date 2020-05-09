/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

const axios = require("axios")
const doctorValidator = use('App/Helpers/Validators/Doctor')

const User = use('App/Helpers/User')
const Doctor = use('App/Helpers/Doctor/Doctor')
const Degree = use('App/Helpers/Doctor/Degree')

class DoctorController {

    async signup ({ request, response, auth }) {
        const form = request.all()

        /**
         * Valida los parámetros necesarios para crear el doctor.
         */
        const formValidator = await doctorValidator.signup( form )
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
                message: "Tuvimos problemas para consultar tu cédula ante la SEP. Inténtalo de nuevo más tarde."
            })
        });

        if(!infoCedula) {
            return response.status(400).json({
                message: "No pudimos obtener información de tu cédula. Verifica que la cédula ingresada esté en existencia. Intenta nuevamente."
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
        if(!degree){
            degree = await Degree.create(infoCedula.titulo);
        }
        
        /**
         * Crea el usuario.
         */
        form.role_id = 1;
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
        const formValidator = await doctorValidator.login( form )
        if ( formValidator.fails() ) {
            return response.status(400).json({
                message: formValidator.messages()[0].message,
                validator: formValidator.messages()
            })
        }

        try {
            const token = await auth.attempt(form.uid, form.password)

            const user = await Doctor.find(form.uid);
            if(!user){
                return response.status(400).json({
                    message: "La cédula no se encuentra en nuestros registros, debes registrarte para tener acceso a la aplicación.",
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
                message: "La cédula o contraseña ingresada es inválida."
            })
        }
    }

}

module.exports = DoctorController
