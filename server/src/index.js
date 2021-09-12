const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");

// Set default environment variables
process.env.NODE_ENV = process.env.NODE_ENV || "production";
process.env.PORT = process.env.PORT || 8080;

// Initialize Express
const app = express();
app.use(express.json());

// CORS
app.use(cors());
if (process.env.NODE_ENV != "production") {
  app.options("*", cors());
}

// Routes
app.use("/auth", authRoutes);
app.use("/", (req, res) => {
  res.json({ message: "PlayToPlay API" });
});

// Error handling
app.use((err, req, res, next) => {
  console.log(err);

  let message = err.message ? err.message : err;

  // Pass through (and rephrase) some acceptable errors
  if (process.env.NODE_ENV == "production") {
    if (message.includes("users_email_unique")) {
      message = "A user with that email already exists.";
    } else {
      message = "An error occured";
    }
  }
  res.status(400).json({
    error: message,
  });
});

app.get("*", function (req, res) {
  res.status(404).json({ error: "PPaNot found" });
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});
