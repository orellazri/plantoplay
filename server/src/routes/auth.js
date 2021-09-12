const bcrypt = require("bcrypt");
const router = require("express").Router();
const passport = require("passport");
const { body, validationResult } = require("express-validator");
const { default: knex } = require("knex");

const db = require("../db");

router.post(
  "/register",
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 5 }),
  body("display_name").isLength({ min: 3 }).trim().escape(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error("Invalid input");
      }

      let { email, password, display_name } = req.body;

      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      await db("users").insert({ email, password, display_name, created_at: db.fn.now(), updated_at: db.fn.now() });

      res.json({ message: "Successfully registered." });
    } catch (err) {
      next(err);
    }
  }
);

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Successfully logged in." });
});

module.exports = router;
