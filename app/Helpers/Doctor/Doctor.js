/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

const UserModel = use('App/Models/User')
const DoctorModel = use('App/Models/Doctor/Doctor')

class Doctor {

    /**
     * Busca el usuario doctor.
     * @param {int} uid 
     */
    static async find(uid) {
        return await UserModel.query().where({
            uid:  uid,
            role_id: 1
        }).first()
    }

    /**
     * Crea un nuevo doctor.
     * @param {Object} form Atributos del doctor.
     */
    static async create( form ){
        return await DoctorModel.create({
            user_id: form.user_id,
            degree_id: form.degree_id,
            institution: form.institution
        })
    }
    
}

module.exports = Doctor
