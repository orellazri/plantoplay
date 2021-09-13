const bcrypt = require("bcrypt");
const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

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

      // Check if a user exists with this email
      const user = await db("users").where({ email }).first();
      if (user) {
        throw new Error("Email address already in use.");
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      // Create user in database
      await db("users").insert({ email, password, display_name, created_at: db.fn.now(), updated_at: db.fn.now() });

      res.json({ message: "Successfully registered." });
    } catch (err) {
      next(err);
    }
  }
);

router.post("/login", body("email").isEmail().normalizeEmail(), body("password").isLength({ min: 5 }), async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await db("users").where({ email }).first();

    // Compare input password with user's password
    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    // Sign a JWT
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET /*{ expiresIn: "30m" }*/);

    res.json({ message: "Successfully logged in.", token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
