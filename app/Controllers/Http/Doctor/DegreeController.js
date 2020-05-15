'use strict'

const degreeMessages = use('App/Helpers/Doctor/Messages/Degree')

const Degree = use('App/Helpers/Doctor/Degree')

class DegreeController {
    async get ({ response }) {
        
        const degrees = await Degree.getAll();

        return response.status(200).json({
            message: degreeMessages.get,
            degrees: degrees
        })
    }

}

module.exports = DegreeController
