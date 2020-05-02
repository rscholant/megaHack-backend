'use strict';

const { randomBytes } = require('crypto');
const { promisify } = require('util');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Token = use('App/Models/Token');
const Mail = use('Mail');
/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');
const { parseISO, isBefore, subHours } = require('date-fns');

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

  async forgotPassword({ request, response }) {
    const { email } = request.all();
    const user = await User.findByOrFail('email', email);
    const random = await promisify(randomBytes)(24);

    const token = random.toString('hex');

    await user.tokens().create({
      token,
      type: 'forgotPassword',
    });

    const resetPassword = `${Env.get('FRONT_URL')}/reset?token=${token}`;
    await Mail.send(
      'emails.forgot',
      { username: user.username, email: user.email, url: resetPassword },
      (message) => {
        message
          .to(user.email)
          .from('contato@khnum.net.br')
          .subject('Hora de recuperar sua senha!');
      },
    );
    return response.status(200);
  }

  async resetPassword({ request, response }) {
    const { token, password } = request.only(['token', 'password']);
    const userToken = await Token.findByOrFail('token', token);
    if (isBefore(parseISO(userToken.created_at), subHours(new Date(), 24))) {
      return response
        .status(400)
        .json({ error: 'Invalide date range, please try again.' });
    }
    const user = await userToken.user().fetch();
    user.password = password;

    user.save();
    return response.status(200);
  }
}

module.exports = UserController;
