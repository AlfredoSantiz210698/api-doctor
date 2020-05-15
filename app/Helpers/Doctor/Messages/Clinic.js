/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

// const exists = (clinicName) => {
//     return `La clínica ${clinicName} ya se encuentra registrado.`
// }

const get = 'Clínicas.'
const exists = 'Solo tienes permitido crear una clínica.'
const notFound = 'Clínica inexistente.'
const created = 'Clínica creado exitosamente.'
const updated = 'Clínica actualizado exitosamente.'

module.exports = {
    exists,
    created,
    notFound,
    updated,
    get
}