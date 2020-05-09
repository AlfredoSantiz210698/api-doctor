/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

const UserModel = use('App/Models/User')

class Patient {

    /**
     * Busca el usuario patient.
     * @param {int} uid 
     */
    static async find(uid) {
        return await UserModel.query().where({
            uid:  uid,
            role_id: 2
        }).first()
    }

}

module.exports = Patient
