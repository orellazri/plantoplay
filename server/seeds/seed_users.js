const bcrypt = require("bcrypt");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(async () => {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash("12345", salt);

      // Inserts seed entries
      return knex("users").insert([
        { email: "ryiseld@gmail.com", password, display_name: "Orel the man" },
        { email: "test@test.com", password, display_name: "Test" },
      ]);
    });
};
