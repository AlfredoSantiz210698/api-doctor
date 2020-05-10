/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

class Dummy {

    /**
     * Obtiene el usuario dato el objecto tipo auth.
     * @param {Object} auth 
     */
    static async getUserByAuth(auth){
        try {
            return await auth.getUser();
        } catch (error) {
            return null;
        }
    }


    static async getAuthToken(auth, uid, password) {
        try {
            return await auth.attempt(uid, password)
        } catch (error) {
            return null;
        }
    }

    
}

module.exports = Dummy
