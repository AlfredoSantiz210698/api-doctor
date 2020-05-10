'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class ValidatorExtendProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    //
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot () {
    const Validator = use('Validator');
    const { phone, image } = use ('App/Helpers/Common/Validators/ValidatorExtend')
    
    Validator.extend('phone', phone);
    Validator.extend('image', image);
  }
}

module.exports = ValidatorExtendProvider
