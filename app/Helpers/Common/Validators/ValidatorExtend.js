/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

const phone = async (data, field, message, args, get) => {
    const value = get(data, field)
    if (!value) {
        return
    }

    const phoneRegex = /(\+34|0034|34)?[ -]*(8|9)[ -]*([0-9][ -]*){9}$/
    if( !phoneRegex.test(value) ){
        throw message
    }
}

const image = async (data, field, message, args, get) => {
    const value = get(data, field)
    if (!value) {
        return
    }

    const imageRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.png|.jpg)$/
    if( !imageRegex.test(value) ){
        throw message
    }
}

const appointmentDuration = async (data, field, message, args, get) => {
    const value = get(data, field)
    if (!value) {
        return
    }

    try {
        const appointmentDuration = [ 15, 20, 30, 60];
        if( appointmentDuration.indexOf( parseFloat(value) ) == -1 ){
            throw message
        }
    } catch (error) {
        throw message
    }
    
} 

const time = async (data, field, message, args, get) => {
    const value = get(data, field)
    if (!value) {
        return
    }

    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]?(:[0-5][0-9])?$/
    if( !timeRegex.test(value) ){
        throw message
    }
} 

const existsInDB = async (data, field, message, args, get) => {
    const value = get(data, field)
    if (!value) {
        return
    }

    const Database = use('Database');

    let row = undefined;
    try {
        row = await Database.table(args[0]).where(args[1], value).first()
    } catch (error) {
        throw "Error al consultar la información en la base de datos."
    }

    if( !row ) {
        throw message
    }
} 

const dateYYYYMMDD = async (data, field, message, args, get) => {
    const value = get(data, field)
    if (!value) {
        return
    }

    const dateRegex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/
    if( !dateRegex.test(value) ){
        throw message
    }
} 

module.exports = {
    phone,
    image,
    appointmentDuration,
    time,
    existsInDB,
    dateYYYYMMDD
}