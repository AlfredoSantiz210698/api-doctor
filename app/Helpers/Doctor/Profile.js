/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

const UserModel = use('App/Models/User')

class Profile {

    /**
     * Obtiene el perfil del doctor.
     * @param {Int} userId 
     */
    static async get(userId){
        return await UserModel.query().where({
            id: userId
        }).with('doctor.degree').first();
    }
    
}

module.exports = Profile
