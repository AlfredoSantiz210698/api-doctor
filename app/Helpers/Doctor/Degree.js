/**
 * @author José Alfredo Gómez Sántiz
 */

 'use strict'

const DegreeModel = use('App/Models/Doctor/Degree')

class Degree {

    /**
     * Busca un degree.
     * @param {String} degree 
     */
    static async find(degree){
        return await DegreeModel.query().where('name', degree).first() //fetch
    }

    /**
     * Crea un nuevo degree.
     * @param {String} degree 
     */
    static async create( degree ){
        return await DegreeModel.create({
            name: degree
        })
    }
    
}

module.exports = Degree
