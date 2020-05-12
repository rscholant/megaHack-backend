'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PaperSchema extends Schema {
  up() {
    this.create('papers', (table) => {
      table.increments();
      table.string('ticker', 8).notNullable().unique();
      table.string('name', 200).notNullable();
      table.integer('sector_id', 100).unsigned().references('id').inTable('sectors');
      table.integer('subsector_id', 100).unsigned().references('id').inTable('sectors');
      table.timestamps();
    });
  }

  down() {
    this.drop('papers');
  }
}

module.exports = PaperSchema;
