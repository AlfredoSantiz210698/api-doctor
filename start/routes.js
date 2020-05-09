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

Route.get('/', () => {
  return { greeting: 'Hello world' }
})


Route.group(() => {
  Route.get('/', () => {
    return { greeting: 'Hello world from api/v1' }
  })

  Route.post('/doctor/signup', 'Doctor/DoctorController.signup')
  Route.post('/doctor/login', 'Doctor/DoctorController.login')

  Route.post('/patient/signup', 'Patient/PatientController.signup')
  Route.post('/patient/login', 'Patient/PatientController.login')

}).prefix('api/v1')