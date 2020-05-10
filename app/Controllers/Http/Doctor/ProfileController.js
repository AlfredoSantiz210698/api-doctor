/**
 * @author José Alfredo Gómez Sántiz
 */

'use strict'

const Profile = use('App/Helpers/Doctor/Profile')

class ProfileController {
    
    async get ({ request, response, auth }) {
        const profileInfo = await Profile.get( auth.user.id )

        return response.status(200).json(
            profileInfo
        )
    }
}

module.exports = ProfileController
