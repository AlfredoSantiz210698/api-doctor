/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

const UserModel = use('App/Models/User')
const DoctorModel = use('App/Models/Doctor/Doctor')

class Profile {

    /**
     * Obtiene el perfil del doctor.
     * @param {Int} userId 
     */
    static async get(userId){
        return await UserModel.query().where({
            id: userId
        }).with('doctorInfo.degree').first();
    }
    
}

module.exports = Profile
