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

const updatedSuccessful = 'Información actualizado exitosamente.'

const getByDegree = (degree) => {
    return `Doctores del grado ${degree}.`
}
module.exports = {
    updatedSuccessful,
    getByDegree
}