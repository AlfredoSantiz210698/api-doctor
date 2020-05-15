/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

const { validate } = use('Validator')

class Reserve {

    static getByDate(form){
        return validate(form, {
            date: 'required|dateYYYYMMDD'
        },{
            'date.required': 'La fecha para ver las reservas es requerida.',
            'date.dateYYYYMMDD': 'La fecha no cumple con el formato permitido (YYYY-MM-DD).'
        })
    }

    static create(form){
        return validate(form, {
            date: 'required|dateYYYYMMDD',
            start: 'time',
            end: 'time',
        },{
            'date.required': 'La fecha de la cita es requerida.',
            'date.dateYYYYMMDD': 'La fecha de la cita no cumple con el formato permitido (YYYY-MM-DD).',
            'start.time': 'La hora de inicio de la reserva no cumple con el formato permitido.',
            'end.time': 'La hora de finalización de la reserva no cumple con el formato permitido.'
        })
    }

}

module.exports = Reserve
