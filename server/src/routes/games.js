const router = require("express").Router();

const { authJwt, fetchIGDBApi } = require("../utils");

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

    const data = await fetchIGDBApi("games", `fields name,summary,genres.name,status,cover.url; where slug = "${slug}";`, next);

    // Replace cover image size
    let dataAsStr = JSON.stringify(data);
    dataAsStr = dataAsStr.replaceAll("t_thumb", "t_cover_big");

    res.json(JSON.parse(dataAsStr)[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
