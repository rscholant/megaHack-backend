'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PreferenceSchema extends Schema {
  up() {
    this.create('preferences', (table) => {
      table.increments();
      table.integer('user_id', 100).unsigned().references('id').inTable('users');
      table.enu('type', ['Sector', 'SubSector', 'Paper']).notNullable();
      table.integer('sector_id', 100).unsigned().references('id').inTable('sectors');
      table.integer('subsector_id', 100).unsigned().references('id').inTable('sectors');
      table.integer('paper_id', 100).unsigned().references('id').inTable('papers');
      table.decimal('note').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('preferences');
  }
}

module.exports = PreferenceSchema;
