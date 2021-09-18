exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users_games")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users_games").insert([
        { user_id: 1, game_id: 113598, list: "plantoplay" },
        { user_id: 1, game_id: 80529, list: "playing" },
        { user_id: 1, game_id: 24417, list: "dropped" },
        { user_id: 1, game_id: 134581, list: "finished" },
      ]);
    });
};
