/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

const { validate } = use('Validator')

class Doctor {

    static update(form){
        return validate(form, {
            photo: 'max:254|image',
        },{
            'photo.image': 'Tu foto de perfil debe ser con extensión ".png" o ".jpg"',
            'photo.max': 'Los caracteres de la cédula supera el tamaño permitido.',
        })
    }

    
}

module.exports = Doctor
