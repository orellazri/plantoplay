const router = require("express").Router();
const axios = require("axios");
const { body, validationResult } = require("express-validator");

const { authJwt, getTwitchAccessToken } = require("../utils");

const fetchTwitchApi = async (path, query) => {
  try {
    const token = await getTwitchAccessToken();

    const { data } = await axios.post(`https://api.igdb.com/v4/${path}`, query, {
      headers: { "Client-ID": process.env.IGDB_CLIENT_ID, Authorization: `Bearer ${token}` },
    });

    return data;
  } catch (err) {
    console.log(err);
  }
};

router.get("/search/:name", authJwt, async (req, res) => {
  const { name } = req.params;

  const data = await fetchTwitchApi("games", `search "${name}"; fields name,slug,cover.url; limit 10;`);

  res.json(data);
});

module.exports = router;
