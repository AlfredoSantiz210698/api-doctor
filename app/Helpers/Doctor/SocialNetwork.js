/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

const SocialNetworkModel = use('App/Models/Doctor/SocialNetwork')

class SocialNetwork {

    static async findByDoctorId(doctorId){
        return await SocialNetworkModel.findBy('doctor_id', doctorId)
    }

    /**
     * Crea el nuevo registro de las redes sociales del doctor.
     * 
     * @param {Int} doctorId 
     * @param {Object} inputs 
     */
    static async create(inputs){
        return await SocialNetworkModel.create( inputs )
    }

    /**
     * Crea el nuevo registro de las redes sociales del doctor.
     * 
     * @param {Int} doctorId 
     * @param {Object} inputs 
     */
    static async update(socialNetworkId, inputs){

        const socialNetwork = await SocialNetworkModel.find(socialNetworkId)

        /**
         * Verifica si hay datos para actualizar para evitar peticiones a la base de datos.
         */
        if(  Object.keys(inputs).length === 0 ){
            return socialNetwork;
        }

        socialNetwork.merge(inputs)
        await socialNetwork.save()

        return socialNetwork;
    }
    

    
}

module.exports = SocialNetwork
