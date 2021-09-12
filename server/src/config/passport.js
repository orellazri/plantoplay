const bcrypt = require("bcrypt");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const db = require("../db");

const initialize = (passport) => {
  let opts = {};
  opts.usernameField = "email";
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET;

  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await db("users").where({ id: jwt_payload.id }).first();

        return done(null, { id: user.id, email: user.email, displayName: user.display_name });
      } catch (err) {
        return done(null, false);
      }
    })
  );
};

module.exports = initialize;
