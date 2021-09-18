const router = require("express").Router();
const { body, validationResult } = require("express-validator");

const { authJwt } = require("../utils");
const db = require("../db");

// Get the user's games and lists details
router.get("/get-games", authJwt, async (req, res, next) => {
  try {
    const { id: user_id } = res.locals.user;

    const games = await db("users_games").where({ user_id });
    res.json({ data: games });
  } catch (err) {
    next(err);
  }
});

// Add a game to the user's list or update its list if its already in the database
router.post(
  "/add-game-to-list",
  authJwt,
  body("game_id").notEmpty(),
  body("list").notEmpty().isIn(["playing", "finished", "plantoplay", "dropped"]),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error("Invalid input");
      }

      const { game_id, list } = req.body;
      const { id: user_id } = res.locals.user;

      // Check if a the user has this game in his list already
      const gameInList = await db("users_games").where({ user_id, game_id }).first();
      if (gameInList) {
        // Update the game's list
        if (gameInList.list === list) {
          return res.json({ message: "Game is aleady in this list." });
        }

        await db("users_games").where({ user_id, game_id }).update({ list });
        return res.json({ message: "Successfully updated game's list." });
      }

      // Insert to database
      await db("users_games").insert({ user_id, game_id, list });

      res.json({ message: "Successfully added game to list." });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
