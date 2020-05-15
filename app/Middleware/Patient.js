'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Dummy = use('App/Helpers/Common/Dummy')

class Patient {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, auth}, next) {
    const user = await Dummy.getUserByAuth(auth);

    if(!user){
      return response.status(400).json({
        message: 'Token de acceso inválido o no enviado. Inicie sesión nuevamente.',
      })
    }
    
    if( user.role_id != 2 ){
      return response.status(400).json({
        message: 'Acceso denegado, exclusivo para pacientes.',
      })
    }
    await next()
  }
}

module.exports = Patient
