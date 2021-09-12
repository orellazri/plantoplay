const router = require("express").Router();

router.get("/register", (req, res, next) => {
  try {
    res.json({ message: "register" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
