'use strict';

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
/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  Route.post('register', 'UserController.create');
  Route.post('authenticate', 'AuthController.authenticate');
  Route.post('forgot', 'UserController.forgotPassword');
  Route.post('reset', 'UserController.resetPassword');
}).prefix(`api/${Env.get('VERSION', 'v1')}`);

Route.group(() => {
  Route.resource('paper', 'PaperController').apiOnly();
  Route.resource('sector', 'SectorController').apiOnly();
  Route.resource('preferences', 'PreferenceController').apiOnly();
})
  .prefix(`api/${Env.get('VERSION', 'v1')}`)
  .middleware('auth');
