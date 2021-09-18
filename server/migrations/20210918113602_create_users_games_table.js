exports.up = function (knex) {
  return knex.schema.dropTableIfExists("users_games").createTable("users_games", (t) => {
    t.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
    t.integer("game_id").notNullable();
    t.enu("list", ["playing", "finished", "plantoplay", "dropped"]).notNullable();
    t.timestamps(true, true);

    t.primary(["user_id", "game_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users_games");
};
