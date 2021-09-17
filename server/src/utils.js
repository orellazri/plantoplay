const jwt = require("jsonwebtoken");
const axios = require("axios");

let currentAccessToken = {};
let lastAccessTokenTime = 0;

// Middleware to verify the jwt token in the request cookie
const authJwt = (req, res, next) => {
  if (!req.cookies.token) {
    return res.status(401).send("Unauthorized");
  }

  jwt.verify(req.cookies.token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Unauthorized");
    }

    res.locals.user = { id: decoded.id, email: decoded.email, display_name: decoded.display_name };
  });

  return next();
};

// Get twitch access token from memory or twitch
const getTwitchAccessToken = async () => {
  try {
    // Check if there is an access token already
    if (currentAccessToken && currentAccessToken.access_token) {
      // Check if the token is not expired
      if (Math.floor((Date.now() - lastAccessTokenTime) / 1000) < currentAccessToken.expires_in) {
        return currentAccessToken.access_token;
      }
    }

    // There is no valid access token. Request one from twitch
    const { data } = await axios.post(
      "https://id.twitch.tv/oauth2/token?client_id=" +
        process.env.IGDB_CLIENT_ID +
        "&client_secret=" +
        process.env.IGDB_CLIENT_SECRET +
        "&grant_type=client_credentials"
    );

    currentAccessToken = data;
    lastAccessTokenTime = Date.now();
    return currentAccessToken.access_token;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { authJwt, getTwitchAccessToken };
