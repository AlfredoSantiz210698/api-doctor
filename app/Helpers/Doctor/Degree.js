/**
 * @author José Alfredo Gómez Sántiz
 */

 'use strict'

const DegreeModel = use('App/Models/Doctor/Degree')

class Degree {

    static async getAll(){
        return await DegreeModel.query().orderBy('name', 'asc').fetch()
    }

    /**
     * @param {String} degree 
     */
    static async findByName(degree){
        return await DegreeModel.query().where('name', degree).first() //fetch
    }

    /**
     * @param {String} degree 
     */
    static async findById(degreeId){
        return await DegreeModel.find(degreeId)
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
