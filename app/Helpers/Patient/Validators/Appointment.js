/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

const { validate } = use('Validator')

class Appointment {


    static getByDate(form){
        return validate(form, {
            date: 'required|dateYYYYMMDD'
        },{
            'date.required': 'La fecha para ver las citas es requerida.',
            'date.dateYYYYMMDD': 'La fecha no cumple con el formato permitido (YYYY-MM-DD).'
        })
    }


    static create(form){
        return validate(form, {
            date: 'required|dateYYYYMMDD',
            start: 'required|time',
            end: 'required|time',
            reason: 'required',
            doctor_id: 'required|existsInDB:doctors,id'
        },{
            'date.required': 'La fecha de la cita es requerida.',
            'date.dateYYYYMMDD': 'La fecha de la cita no cumple con el formato permitido (YYYY-MM-DD).',
            'start.required': 'La hora de inicio de la cita es requerida.',
            'start.time': 'La hora de inicio de la cita no cumple con el formato permitido.',
            'end.required': 'La hora de finalización de la cita es requerida.',
            'end.time': 'La hora de finalización de la cita no cumple con el formato permitido.',
            'reason.required': 'Razón de la cita requerida.',
            'doctor_id.required': 'Doctor requerido.',
            'doctor_id.existsInDB': 'El doctor no existe en nuestros registros.',
        })
    }

    
    // static update(form){
    //     return validate(form, {
    //         id: 'required|existsInDB:clinics,id',
    //         name: 'required|max:150',
    //         phone: 'required|min:10|max:20|phone',
    //         latitude: 'required|number',
    //         longitude: 'required|number',
    //         open: 'required|time',
    //         close: 'required|time',
    //         appointment_duration: 'required|number|appointmentDuration',
    //     },{
    //         'id.required': 'Indentificador de la clínica requerida.',
    //         'id.existsInDB': 'Clínica inexistente.',
    //         'name.required': 'Nombre de la clínica requerida.',
    //         'name.max': 'Los caracteres del nombre de la clínica supera el tamaño permitido.',
    //         'phone.required': 'Teléfono requerido.',
    //         'phone.min': 'El teléfono debe tener al menos 10 dígitos.',
    //         'phone.max': 'Los dígitos del teléfono supera el tamaño permitido.',
    //         'phone.phone': 'El formato del teléfono no cumple con los criterios requeridos.',
    //         'latitude.required': 'Latitud de la clínica requerido.',
    //         'latitude.number': 'La latitud debe ser un valor numérico.',
    //         'longitude.required': 'La longitud de la clínica requerido.',
    //         'longitude.number': 'La longitud debe ser un valor numérico.',
    //         'open.required': 'Hora de apertura requerido.',
    //         'open.time': 'El formato de la hora de apertura no cumple con los criterios requeridos.',
    //         'close.required': 'Hora de cierre requerido.',
    //         'close.time': 'El formato de la de hora de cierre no cumple con los criterios requeridos.',
    //         'appointment_duration.required': 'Duración de las citas requerida.',
    //         'appointment_duration.number': 'La duración de las citas debe ser un valor numérico.',
    //         'appointment_duration.appointmentDuration': 'La duración de las citas predeterminadas debe ser 15, 20, 30 o 60 minutos.'
    //     })
    // }
}

module.exports = Appointment
