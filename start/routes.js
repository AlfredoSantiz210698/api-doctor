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
 */

 /**
  * Endpoints únicamente accesibles para los doctores (role_id = 1)
  */
Route.group(() => {
  
  Route.get('/msg', () => {
    return { message: 'Doctors' }
  })

  Route.get('/profile', 'Doctor/ProfileController.get')
  Route.put('/profile/doctor', 'Doctor/DoctorController.update')

}).prefix('api/v1/doctors').middleware(['doctor', 'auth:jwt'])


/**
 *              _   _            _       
 *  _ __   __ _| |_(_) ___ _ __ | |_ ___ 
 * | '_ \ / _` | __| |/ _ \ '_ \| __/ __|
 * | |_) | (_| | |_| |  __/ | | | |_\__ \
 * | .__/ \__,_|\__|_|\___|_| |_|\__|___/
 * |_|                                   
 */

/**
* Endpoints únicamente accesibles para los pacientes (role_id = 2)
*/

// Route.group(() => {
//   // Route.get('/', 'Doctor/DoctorController.getAll')
// }).prefix('api/v1/doctors').middleware(['patient', 'auth:jwt'])


Route.group(() => {
  Route.get('/msg', () => {
    return { message: 'Patient' }
  })

  Route.get('/profile', 'Patient/ProfileController.get')  

}).prefix('api/v1/patients').middleware(['patient', 'auth:jwt'])