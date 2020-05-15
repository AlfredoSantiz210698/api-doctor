'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

const Route = use('Route')

/**
 *              _     _ _      
 *  _ __  _   _| |__ | (_) ___ 
 * | '_ \| | | | '_ \| | |/ __|
 * | |_) | |_| | |_) | | | (__ 
 * | .__/ \__,_|_.__/|_|_|\___|
 * |_|                         
 */

Route.get('/', () => {
  return { greeting: 'Hello world.' }
})

Route.group(() => {
  Route.get('/', () => {
    return { greeting: 'Hello world from api doctor.' }
  })

  Route.post('/doctors/signup', 'Doctor/UserController.signup')
  Route.post('/doctors/login', 'Doctor/UserController.login')

  Route.post('/patients/signup', 'Patient/UserController.signup')
  Route.post('/patients/login', 'Patient/UserController.login')

}).prefix('api/v1')


/**
 *      _            _                 
 *   __| | ___   ___| |_ ___  _ __ ___ 
 *  / _` |/ _ \ / __| __/ _ \| '__/ __|
 * | (_| | (_) | (__| || (_) | |  \__ \
 *  \__,_|\___/ \___|\__\___/|_|  |___/
 * 
 * Endpoints únicamente accesibles para los doctores (role_id = 1)
 */

Route.group(() => {
  
  Route.get('/msg', () => {
    return { message: 'Doctors' }
  })

  /**
   * Perfil.
   */
  Route.get('/profile', 'Doctor/ProfileController.get')
  Route.put('/profile/doctor', 'Doctor/DoctorController.update')

  /**
   * Redes sociales.
   */
  Route.get('/social_network', 'Doctor/SocialNetworkController.get')
  Route.post('/social_network', 'Doctor/SocialNetworkController.create')
  Route.put('/social_network', 'Doctor/SocialNetworkController.update')

  /**
   * Clínicas.
   */
  Route.post('/clinics', 'Doctor/ClinicController.create')
  Route.put('/clinics', 'Doctor/ClinicController.update')

  /**
   * Citas.
   */
  Route.get('/appointments', 'Doctor/AppointmentController.getByDate')
  Route.post('/appointments', 'Doctor/AppointmentController.create')

  /**
   * Reservas
   */
  Route.get('/reserves', 'Doctor/ReserveController.get')
  Route.post('/reserves', 'Doctor/ReserveController.create')

}).prefix('api/v1/doctors').middleware(['doctor', 'auth:jwt'])


/**
 *              _   _            _       
 *  _ __   __ _| |_(_) ___ _ __ | |_ ___ 
 * | '_ \ / _` | __| |/ _ \ '_ \| __/ __|
 * | |_) | (_| | |_| |  __/ | | | |_\__ \
 * | .__/ \__,_|\__|_|\___|_| |_|\__|___/
 * |_|                                   
 * 
 * Endpoints únicamente accesibles para los pacientes (role_id = 2)
 */

 /**
  * Doctores.
  */
Route.group(() => {
  
  /**
   * Grados.
   */
  Route.get('/degrees', 'Doctor/DegreeController.get')
  Route.get('/degrees/search/:id', 'Doctor/DoctorController.getByDegree')

  /**
   * Clínica.
   */
  Route.get('/:id/clinics', 'Doctor/ClinicController.getByDoctorId')

  /**
   * Citas.
   */
  Route.get('/:id/appointments', 'Doctor/AppointmentController.getByDoctorIdDate')

  /**
   * Reservas
   */
  Route.get('/:id/reserves', 'Doctor/ReserveController.getByDoctorIdDate')

  /**
   * Redes sociales.
   */
  Route.get('/:id/social_networks', 'Doctor/SocialNetworkController.getByDoctorId')

}).prefix('api/v1/doctors').middleware(['patient', 'auth:jwt'])


/**
 * Pacientes.
 */
Route.group(() => {
  Route.get('/msg', () => {
    return { message: 'Patient' }
  })

  /**
   * Perfil.
   */
  Route.get('/profile', 'Patient/ProfileController.get')
  
  /**
   * Citas.
   */
  Route.get('/appointments', 'Patient/AppointmentController.get')
  Route.post('/appointments', 'Patient/AppointmentController.create')

}).prefix('api/v1/patients').middleware(['patient', 'auth:jwt'])