const router = require("express").Router();
const axios = require("axios");
const { body, validationResult } = require("express-validator");

const { authJwt, getTwitchAccessToken } = require("../utils");

const fetchTwitchApi = async (path, query, next) => {
  try {
    const token = await getTwitchAccessToken();

    const { data } = await axios.post(`https://api.igdb.com/v4/${path}`, query, {
      headers: { "Client-ID": process.env.IGDB_CLIENT_ID, Authorization: `Bearer ${token}` },
    });

    return data;
  } catch (err) {
    next(err);
  }
};

// Search for a game by name
router.get("/search/:name", authJwt, async (req, res, next) => {
  try {
    const { name } = req.params;
    const data = await fetchTwitchApi("games", `search "${name}"; fields name,slug,cover.url; limit 10;`, next);

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

    const data = await fetchTwitchApi("games", `fields name,summary,genres.name,status,cover.url; where slug = "${slug}";`, next);

    // Replace cover image size
    let dataAsStr = JSON.stringify(data);
    dataAsStr = dataAsStr.replaceAll("t_thumb", "t_cover_big");

    res.json(JSON.parse(dataAsStr));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
