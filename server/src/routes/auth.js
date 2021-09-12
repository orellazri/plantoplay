const router = require("express").Router();

const db = require("../db");

router.get("/register", async (req, res, next) => {
  try {
    res.json({ message: "register" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
