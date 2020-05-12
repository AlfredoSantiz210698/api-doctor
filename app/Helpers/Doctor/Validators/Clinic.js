/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

const { validate } = use('Validator')

class Clinic {

    static create(form){
        return validate(form, {
            name: 'required|max:150',
            phone: 'required|min:10|max:20|phone',
            latitude: 'required|number',
            longitude: 'required|number',
            open: 'required|time',
            close: 'required|time',
            appointment_duration: 'required|number|appointmentDuration',
        },{
            'name.required': 'Nombre de la clínica requerida.',
            'name.max': 'Los caracteres del nombre de la clínica supera el tamaño permitido.',
            'phone.required': 'Teléfono requerido.',
            'phone.min': 'El teléfono debe tener al menos 10 dígitos.',
            'phone.max': 'Los dígitos del teléfono supera el tamaño permitido.',
            'phone.phone': 'El formato del teléfono no cumple con los criterios requeridos.',
            'latitude.required': 'Latitud de la clínica requerido.',
            'latitude.number': 'La latitud debe ser un valor numérico.',
            'longitude.required': 'La longitud de la clínica requerido.',
            'longitude.number': 'La longitud debe ser un valor numérico.',
            'open.required': 'Hora de apertura requerido.',
            'open.time': 'El formato de la hora de apertura no cumple con los criterios requeridos.',
            'close.required': 'Hora de cierre requerido.',
            'close.time': 'El formato de la de hora de cierre no cumple con los criterios requeridos.',
            'appointment_duration.required': 'Duración de las citas requerida.',
            'appointment_duration.number': 'La duración de las citas debe ser un valor numérico.',
            'appointment_duration.appointmentDuration': 'La duración de las citas predeterminadas debe ser 15, 20, 30 o 60 minutos.'
        })
    }

    
    static update(form){
        return validate(form, {
            id: 'required|existsInDB:clinics,id',
            name: 'required|max:150',
            phone: 'required|min:10|max:20|phone',
            latitude: 'required|number',
            longitude: 'required|number',
            open: 'required|time',
            close: 'required|time',
            appointment_duration: 'required|number|appointmentDuration',
        },{
            'id.required': 'Indentificador de la clínica requerida.',
            'id.existsInDB': 'Clínica inexistente.',
            'name.required': 'Nombre de la clínica requerida.',
            'name.max': 'Los caracteres del nombre de la clínica supera el tamaño permitido.',
            'phone.required': 'Teléfono requerido.',
            'phone.min': 'El teléfono debe tener al menos 10 dígitos.',
            'phone.max': 'Los dígitos del teléfono supera el tamaño permitido.',
            'phone.phone': 'El formato del teléfono no cumple con los criterios requeridos.',
            'latitude.required': 'Latitud de la clínica requerido.',
            'latitude.number': 'La latitud debe ser un valor numérico.',
            'longitude.required': 'La longitud de la clínica requerido.',
            'longitude.number': 'La longitud debe ser un valor numérico.',
            'open.required': 'Hora de apertura requerido.',
            'open.time': 'El formato de la hora de apertura no cumple con los criterios requeridos.',
            'close.required': 'Hora de cierre requerido.',
            'close.time': 'El formato de la de hora de cierre no cumple con los criterios requeridos.',
            'appointment_duration.required': 'Duración de las citas requerida.',
            'appointment_duration.number': 'La duración de las citas debe ser un valor numérico.',
            'appointment_duration.appointmentDuration': 'La duración de las citas predeterminadas debe ser 15, 20, 30 o 60 minutos.'
        })
    }
}

module.exports = Clinic
