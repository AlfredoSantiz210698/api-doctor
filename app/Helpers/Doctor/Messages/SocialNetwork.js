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

const createSuccessful = 'Redes sociales creado exitosamente.'
const get = 'Redes sociales.'
const notFound = 'Redes sociales inexistentes.'
const noRegistered = 'Aún no tienes redes sociales registrados.'
const exists = 'Registro de redes sociales existente.'
const updated = 'Redes sociales actualizado exitosamente.'

module.exports = {
    createSuccessful,
    get,
    notFound,
    exists,
    updated,
    noRegistered
}