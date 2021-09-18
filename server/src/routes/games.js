const router = require("express").Router();

const { authJwt, fetchIGDBApi } = require("../utils");
const db = require("../db");

// Search for a game by name
router.get("/search/:name", authJwt, async (req, res, next) => {
  try {
    const { name } = req.params;
    const data = await fetchIGDBApi("games", `search "${name}"; fields name,slug,cover.url; limit 20;`, next);

    // Replace cover image size
    let dataAsStr = JSON.stringify(data);
    dataAsStr = dataAsStr.replaceAll("t_thumb", "t_cover_big");

    res.json(JSON.parse(dataAsStr));
  } catch (err) {
    next(err);
  }
});

// Get game details by slug
router.get("/game/:slug", authJwt, async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { id: user_id } = res.locals.user;

    let data = await fetchIGDBApi("games", `fields id,name,summary,genres.name,status,cover.url; where slug = "${slug}";`, next);
    data = data[0];

    // Replace cover image size
    let dataAsStr = JSON.stringify(data);
    dataAsStr = dataAsStr.replaceAll("t_thumb", "t_cover_big");
    data = JSON.parse(dataAsStr);

    // Also get information about the user-game relationship (list it's in)
    const userGame = await db("users_games").where({ user_id, game_id: data.id }).first();
    if (userGame && userGame.list) {
      data.user = { list: userGame.list };
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
