'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Sector = use('App/Models/Sector');

class SectorController {
  async index() {
    const sectors = await Sector.all();
    return sectors;
  }

  /**
   * Create/save a new sector.
   * POST sectors
   */
  async store({ request }) {
    const data = request.only(['name']);
    const sector = await Sector.create(data);
    return sector;
  }

  /**
   * Display a single sector.
   * GET sectors/:id
   */
  async show({ params }) {
    const sector = await Sector.findOrFail(params.id);
    return sector;
  }


  /**
   * Update sector details.
   * PUT or PATCH sectors/:id
   */
  async update({ params, request }) {
    const data = request.only(['name']);
    const sector = await Sector.findOrFail(params.id);
    sector.merge(data);
    await sector.save();
    return sector;
  }

  /**
   * Delete a sector with id.
   * DELETE sectors/:id
   */
  async destroy({ params, response }) {
    const sector = Sector.findOrFail(params.id);
    await sector.delete;
    return response.status(200);
  }
}

module.exports = SectorController;
