/**
 * @author José Alfredo Gómez Sántiz
 */
 
'use strict'

const UserModel = use('App/Models/User')
const roleId = 2;

class User {

    /**
     * Busca un usuario en específico.
     */
    static async find(uid) {
        return await UserModel.query().where({
            uid:  uid,
            role_id: roleId
        }).first()
    }

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
            role_id: roleId
        })
    }
    
}

module.exports = User
