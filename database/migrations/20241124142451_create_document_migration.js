const { timestamps, onUpdateTrigger } = require("../utils");
exports.up = async function (knex) {
  const migration = await knex.schema.createTable('documents', (table) => {
    table.increments('id').primary(); 
    table.string('documentSlug').notNullable().unique(); 
    table.integer('owner_id')
    table.string('mime_type')
    table.string('description')
    timestamps(knex, table);
  });
  await knex.raw(onUpdateTrigger("documents"));
  return migration;
};
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("documents");
};
