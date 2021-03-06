const bcrypt = require("bcrypt");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const { authJwt } = require("../utils");
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
      const userInDb = await db("users").where({ email }).first();
      if (userInDb) {
        throw new Error("Email address already in use.");
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      // Create user in database
      const id = await db("users").insert({ email, password, display_name }).returning("id");

      // Sign a JWT
      const user = { id: id[0], email, display_name };
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET /*{ expiresIn: "30m" }*/);

      // Send a cookie that expires in ~1 month
      res.cookie("token", token, { httpOnly: true, maxAge: 90 * 365 * 24 * 60 * 60 });

      res.json({ message: "Successfully registered.", id: user.id, email: user.email, display_name: user.display_name });
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

    // Send a cookie that expires in ~1 month
    res.cookie("token", token, { httpOnly: true, maxAge: 90 * 365 * 24 * 60 * 60 });

    res.json({ message: "Successfully logged in.", id: user.id, email: user.email, display_name: user.display_name });
  } catch (err) {
    next(err);
  }
});

// Verify the user's jwt from the request cookie
router.get("/verify", authJwt, (_req, res) => {
  const { id, email, display_name } = res.locals.user;
  res.json({ message: "Token successfully verified.", id, email, display_name });
});

// Logout the user
router.get("/logout", (_req, res) => {
  res.clearCookie("token");
  res.json({ message: "Successfully logged out." });
});

module.exports = router;
