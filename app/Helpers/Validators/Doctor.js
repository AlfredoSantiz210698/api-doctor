/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

const { validate } = use('Validator')

class Doctor {

    static signup(form){
        return validate(form, {
            uid: 'required|unique:users|max:100',
            // full_name: 'required|max:100',
            // institution: 'required|max:150',
	        password: 'required|min:8|max:20',
	        phone: 'required|min:10|max:20|phone',
        },{
            'uid.required': 'Cédula requerida.',
            'uid.unique': 'La cédula ya se encuentra en uso.',
            'uid.max': 'Los caracteres de la cédula supera el tamaño permitido.',
            'full_name.required': 'Nombre completo requerido ( Nombre(s) + apellido paterno + apellido materno ).',
            'full_name.max': 'Los caracteres del nombre supera el tamaño permitido.',
            'institution.required': 'Institución requerida.',
            'institution.max': 'Los caracteres de la institución supera el tamaño permitido.',
            'password.required': 'Contraseña requerida.',
            'password.min': 'La contraseña debe tener al menos 8 caracteres.',
            'password.max': 'Los caracteres de la contraseña supera el tamaño permitido.',
            'phone.required': 'Teléfono requerido.',
            'phone.min': 'El teléfono debe tener al menos 10 dígitos.',
            'phone.max': 'Los dígitos del teléfono supera el tamaño permitido.',
            'phone.phone': 'El teléfono no cumple con los criterios requeridos.'
        })
    }

    static login(form){
        return validate(form, {
            uid: 'required',
	        password: 'required',
        },{
            'uid.required': 'Cédula requerida.',
            'password.required': 'Contraseña requerida.',
        })
    }
}

module.exports = Doctor
