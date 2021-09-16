const jwt = require("jsonwebtoken");

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

module.exports = { authJwt };
