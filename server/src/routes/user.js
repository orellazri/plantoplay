const router = require("express").Router();
const { body, validationResult } = require("express-validator");

const { authJwt, fetchIGDBApi } = require("../utils");
const db = require("../db");

// Get details for a game in the user's lists
router.get("/game/:id", authJwt, async (req, res, next) => {
  try {
    const { id: user_id } = res.locals.user;
    const { id: game_id } = req.params;

    const game = await db("users_games").where({ user_id, game_id });
    if (game.length == 0) {
      throw new Error("Game not found.");
    }

    res.json({ data: game });
  } catch (err) {
    next(err);
  }
});

// Get the user's games and lists details
router.get("/games", authJwt, async (req, res, next) => {
  try {
    const { id: user_id } = res.locals.user;

    let data = await db("users_games").where({ user_id });

    // Fetch igdb to get details about the games the user has
    const listOfGameIds = data.map((game, i) => game.game_id).join(",");
    const gamesInfo = await fetchIGDBApi("games", `fields name,slug,cover.url; where id = (${listOfGameIds});`, next);

    // Add info from the igdb result to the response
    for (game of data) {
      game.info = gamesInfo.filter((elem) => elem.id.toString() == game.game_id.toString())[0];
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
});

// Add a game to the user's list or update its list if its already in the database
router.post(
  "/games",
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

// Delete a game from the user's lists
router.delete("/games", authJwt, body("game_id").notEmpty(), async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Invalid input");
    }

    const { game_id } = req.body;
    const { id: user_id } = res.locals.user;

    await db("users_games").where({ user_id, game_id }).del();

    res.json({ message: "Successfully deleted the game from the user's list." });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
