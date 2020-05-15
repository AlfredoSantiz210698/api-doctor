/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

const getByDate = (date) => {
    return `Citas del ${date}.`
}

const get = 'Citas.'
// const notFound = 'Clínica inexistente, revisa que hayas creado alguno.'
const created = 'Cita creado exitosamente.'

module.exports = {
    get,
    created,
    // notFound,
    getByDate
}