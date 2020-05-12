/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

// const exists = (clinicName) => {
//     return `La clínica ${clinicName} ya se encuentra registrado.`
// }

const exists = 'Solo tienes permitido crear una clínica.'
const notFound = 'Clínica inexistente, revisa que hayas creado alguno.'
const created = 'Clínica creado exitosamente.'
const updated = 'Clínica actualizado exitosamente.'

module.exports = {
    exists,
    created,
    notFound,
    updated
}