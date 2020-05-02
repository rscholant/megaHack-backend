'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
const Mail = use('Mail');
/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

class UserController {
  async create({ request }) {
    const data = request.only(['username', 'email', 'password', 'name', 'birth']);
    const user = User.create(data);
    await Mail.send(
      'emails.welcome',
      { username: user.username, emailContato: Env.get('MAIL_USERNAME') },
      (message) => {
        message
          .to(user.email)
          .from('contato@khnum.net.br')
          .subject(`Bem vindo ao ${Env.get('APP_NAME')}`);
      },
    );
  }
}

module.exports = UserController;
