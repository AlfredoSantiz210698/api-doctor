/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

const Doctor = use('App/Helpers/Doctor/Doctor')
const socialNetworkMessages = use('App/Helpers/Doctor/Messages/SocialNetwork')
const SocialNetwork = use('App/Helpers/Doctor/SocialNetwork')

class SocialNetworkController {

    async get ({ request, response, auth }) {

        const doctor = await Doctor.findByUserId(auth.user.id)

        const socialNetwork = await SocialNetwork.findByDoctorId(doctor.id)
        if( !socialNetwork ){
            return response.status(404).json({
                message: socialNetworkMessages.notFound
            })
        }
        
        return response.status(200).json({
            ...{
                message: socialNetworkMessages.get
            },
            ...socialNetwork.toJSON()
        })
    }

    async create ({ request, response, auth }) {
        const inputs = request.only([
            'facebook',
            'twitter',
            'instagram'
        ])

        const doctor = await Doctor.findByUserId(auth.user.id)

        if( await SocialNetwork.findByDoctorId(doctor.id) ){
            return response.status(400).json({
                message: socialNetworkMessages.exists
            })
        }

        inputs.doctor_id = doctor.id;

        const socialNetwork = await SocialNetwork.create( inputs )

        return response.status(201).json({
            message: socialNetworkMessages.createSuccessful,
            socialNetwork: socialNetwork
        })
    }

    async update ({ request, response, auth }) {
        const inputs = request.only([
            'facebook',
            'twitter',
            'instagram'
        ])
        const doctor = await Doctor.findByUserId(auth.user.id)

        const socialNetwork = await SocialNetwork.findByDoctorId(doctor.id)
        if( !socialNetwork ){
            return response.status(404).json({
                message: socialNetworkMessages.notFound
            })
        }

        const socialNetworkUpdated = await SocialNetwork.update(socialNetwork.id, inputs )

        return response.status(200).json({
            ...{
                message: socialNetworkMessages.updated
            },
            ...socialNetworkUpdated.toJSON()
        })
    }

}

module.exports = SocialNetworkController
