const router = require("express").Router();
const { body, validationResult } = require("express-validator");

const db = require("../db");

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  body("display_name").isLength({ min: 3 }),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error("Invalid input");
      }

      res.json({ message: "register" });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
