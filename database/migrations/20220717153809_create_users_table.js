const {
  timestamps,
  onUpdateTrigger,
  ON_UPDATE_TIMESTAMP_FUNCTION,
} = require("../utils");
exports.up = async function (knex) {
  await knex.raw(ON_UPDATE_TIMESTAMP_FUNCTION);
  const migration = await knex.schema.createTable("users", function (table) {
    table.bigIncrements("id");
    table.string("ulid");
    table.string("name");
    table.string("email").unique();
    table.string("contactMobileNumber").unique();
    table.tinyint("gender");
    table.string("password");
    table.string("profilePictureSlug");
    table.tinyint("status").index();
    table.string("role");
    table.jsonb("meta");
    timestamps(knex, table);
  });
  await knex.raw(onUpdateTrigger("users"));
  return migration;
};
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
