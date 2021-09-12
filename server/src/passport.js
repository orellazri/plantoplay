const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const db = require("./db");

const initialize = (passport) => {
  const authenticateUser = async (email, password, done) => {
    try {
      const user = await db("users").where({ email }).first();

      if (!(await bcrypt.compare(password, user.password))) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(null, false, { message: "No user found with this email" });
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db("users").where(id);

      return done(null, user);
    } catch (err) {
      return done(null, false, { message: "Could not find user" });
    }
  });
};

module.exports = initialize;
