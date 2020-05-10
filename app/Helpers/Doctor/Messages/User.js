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
const uidOrPasswordNotFound = 'La cédula o contraseña ingresada es inválida.'
const uidNotExists = 'La cédula no se encuentra en nuestros registros, debes registrarte para tener acceso a la aplicación.'
const failedLicenseRequest = 'Tuvimos problemas para consultar tu cédula ante la SEP. Inténtalo de nuevo más tarde.'
const licenseNotFound = 'No pudimos obtener información de tu cédula. Verifica que la cédula ingresada esté en existencia. Intenta nuevamente.'
const accountCreatedSuccessful = 'Cuenta creado exitosamente.'

module.exports = {
    welcome,
    uidOrPasswordNotFound,
    uidNotExists,
    failedLicenseRequest,
    licenseNotFound,
    accountCreatedSuccessful
}