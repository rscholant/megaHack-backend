'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Preference = use('App/Models/Preference');
/**
 * Resourceful controller for interacting with preferences
 */
class PreferenceController {
  /**
   * Show a list of all preferences.
   * GET preferences
   */
  async index({ auth, response }) {
    const preferences = await Preference
      .query()
      .where('user_id', '=', auth.user.id)
      .with('sector')
      .with('subSector')
      .with('paper')
      .fetch();
    console.log(preferences.rows);
    return response.json(preferences.rows);
  }


  /**
   * Create/save a new preference.
   * POST preferences
   */
  async store({ request, auth }) {
    const requestData = request.only(['type', 'sector_id', 'subsector_id', 'paper_id', 'note']);
    // eslint-disable-next-line camelcase
    const user_id = auth.user.id;
    const data = { user_id, ...requestData };

    const preference = await Preference.create(data);
    return preference;
  }

  /**
   * Display a single preference.
   * GET preferences/:id
   */
  async show({ params, auth }) {
    const preference = await Preference
      .query()
      .where('user_id', '=', auth.user.id)
      .where('id', '=', params.id)
      .with('sector')
      .with('subSector')
      .with('paper')
      .first();
    return preference;
  }

  /**
   * Update preference details.
   * PUT or PATCH preferences/:id
   */
  async update({
    params, request, response, auth,
  }) {
    const data = request.only(['type', 'sector_id', 'subsector_id', 'paper_id', 'note']);
    const preference = await Preference.findOrFail(params.id);
    if (preference.user_id === auth.user.id) {
      preference.merge(data);
      await preference.save;
      return preference;
    }
    return response.status(401).json('{ "error":  "this preference does not belong to you 😪" }');
  }

  /**
   * Delete a preference with id.
   */
  async destroy({ params, auth, response }) {
    const preference = await Preference.findOrFail(params.id);
    if (preference.user_id === auth.user.id) {
      await preference.delete;
      return response.status(200);
    }
    return response.status(401).json('{ "error":  "this preference does not belong to you 😪" }');
  }
}

module.exports = PreferenceController;
