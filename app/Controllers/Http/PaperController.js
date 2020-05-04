'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Paper = use('App/Models/Paper');

class PaperController {
  async index() {
    const papers = await Paper.all();
    return papers;
  }

  /**
   * Create/save a new paper.
   * POST papers
   */
  async store({ request }) {
    const data = request.only(['ticker', 'name', 'sector_id', 'subsector_id']);
    const paper = Paper.create(data);
    return paper;
  }

  /**
   * Display a single paper.
   * GET papers/:id
   */
  async show({ params }) {
    const paper = Paper.findOrFail(params.id);
    return paper;
  }

  /**
   * Update paper details.
   * PUT or PATCH papers/:id
   */
  async update({ params, request }) {
    const data = request.only(['ticker', 'name', 'sector_id', 'subsector_id']);
    const paper = Paper.findOrFail(params.id);
    paper.merge(data);
    await paper.save();
    return paper;
  }

  /**
   * Delete a paper with id.
   * DELETE papers/:id
   */
  async destroy({ params, response }) {
    const paper = Paper.findOrFail(params.id);
    await paper.delete;
    return response.status(200);
  }
}

module.exports = PaperController;
