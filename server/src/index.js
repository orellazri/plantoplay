const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const gamesRoutes = require("./routes/games");
const userRoutes = require("./routes/user");

// Set default environment variables
process.env.NODE_ENV = process.env.NODE_ENV || "production";
process.env.PORT = process.env.PORT || 8080;

// Initialize Express
const app = express();
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV != "production") {
  app.options("*", cors());
}
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes);
app.use("/games", gamesRoutes);
app.use("/user", userRoutes);
app.use("/", (_req, res) => {
  res.json({ message: "Plan to Play API" });
});

// Error handling
app.use((err, req, res, next) => {
  console.log(err);

  let message = err.message ? err.message : err;

  // Pass through (and rephrase) some acceptable errors
  if (process.env.NODE_ENV == "production") {
    const messagesToPass = ["Email address already in use."];

    if (!messagesToPass.includes(message)) {
      message = "An error occured";
    }
  }

  res.status(400).json({
    message,
  });
});

app.get("*", function (req, res) {
  res.status(404).json({ error: "Not found" });
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});
