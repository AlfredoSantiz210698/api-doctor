/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

const getByDate = (date) => {
    return `Reservas de la fecha ${date}.`
}

const created = 'Reserva creado exitosamente.'

module.exports = {
    created,
    getByDate
}