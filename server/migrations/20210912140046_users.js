exports.up = function (knex) {
  return knex.schema.dropTableIfExists("users").createTable("users", (t) => {
    t.increments("id");
    t.string("email", 80).notNullable().unique();
    t.string("password", 255).notNullable();
    t.string("display_name", 30).notNullable();
    t.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
