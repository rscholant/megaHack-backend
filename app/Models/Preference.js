'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Preference extends Model {
  user() {
    return this.belongsTo('App/Models/User', 'user_id', 'id');
  }

  sector() {
    return this.belongsTo('App/Models/Sector', 'sector_id', 'id');
  }

  subSector() {
    return this.belongsTo('App/Models/Sector', 'subsector_id', 'id');
  }

  paper() {
    return this.belongsTo('App/Models/Paper', 'paper_id', 'id');
  }
}

module.exports = Preference;
