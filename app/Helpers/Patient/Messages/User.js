/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

// const phone = async (data, field, message, args, get) => {
//     const value = get(data, field)
//     if (!value) {
//         return
//     }

//     const phoneRegex = /(\+34|0034|34)?[ -]*(8|9)[ -]*([0-9][ -]*){9}$/
//     if( !phoneRegex.test(value) ){
//         throw message
//     }
// }

const welcome = 'Bienvenido.'
const emailOrPasswordNotFound = 'El email o contraseña ingresada es inválida.'
const emailNotExists = 'El email no se encuentra en nuestros registros, debes registrarte para tener acceso a la aplicación.'
const accountCreatedSuccessful = 'Cuenta creado exitosamente.'

module.exports = {
    welcome,
    emailOrPasswordNotFound,
    emailNotExists,
    accountCreatedSuccessful
}