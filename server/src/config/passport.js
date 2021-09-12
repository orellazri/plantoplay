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

        return done(null, user);
      } catch (err) {
        return done(null, false);
      }
    })
  );

  // passport.serializeUser((user, done) => {
  //   done(null, user.id);
  // });

  // passport.deserializeUser(async (id, done) => {
  //   try {
  //     const user = await db("users").where(id);

  //     return done(null, user);
  //   } catch (err) {
  //     return done(null, false, { message: "Could not find user" });
  //   }
  // });
};

module.exports = initialize;
