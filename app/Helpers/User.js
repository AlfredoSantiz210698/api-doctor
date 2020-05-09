/**
 * @author José Alfredo Gómez Sántiz
 */
 
'use strict'

const UserModel = use('App/Models/User')

class User {

    /**
     * Crea un nuevo usuario.
     * @param {Object} form Atributos del usuario.
     */
    static async create( form ){
        return await UserModel.create({
            uid: form.uid,
            password: form.password,
            full_name: form.full_name,
            phone: form.phone,
            role_id: form.role_id
        })
    }
    
}

module.exports = User
