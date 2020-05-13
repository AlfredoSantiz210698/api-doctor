/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

const getByDate = (date) => {
    return `Citas de la fecha ${date}.`
}

// const exists = 'Solo tienes permitido crear una clínica.'
// const notFound = 'Clínica inexistente, revisa que hayas creado alguno.'
const created = 'Cita creado exitosamente.'

module.exports = {
    // exists,
    created,
    // notFound,
    getByDate
}