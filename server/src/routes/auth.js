const bcrypt = require("bcrypt");
const router = require("express").Router();
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

      let { email, password, display_name: displayName } = req.body;
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      res.json({ message: "Successfully registered." });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
