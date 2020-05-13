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
     * Busca un usuario en específico.
     */
    static async findByNamePhone(name, phone) {
        return await UserModel.query().where({
            full_name:  name,
            phone:  phone,
            role_id: roleId
        }).first()
    }

    /**
     * Crea un nuevo usuario.
     * @param {Object} inputs Atributos del usuario.
     */
    static async create( inputs ){
        inputs.role_id = roleId;

        return await UserModel.create( inputs )
    }

    /**
     * Crea un nuevo paciente.
     * 
     * @param {Object} inputs Atributos del paciente.
     */
    static async createPatient( inputs ){
        inputs.role_id = roleId;
        console.log(inputs)
        return await UserModel.create( inputs )
    }
    
}

module.exports = User
