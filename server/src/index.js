const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Initialize Express
const app = express();
app.use(express.json());

// CORS
app.use(cors());
app.options("*", cors());

// Set default environment variables
process.env.NODE_ENV = process.env.NODE_ENV || "production";
process.env.PORT = process.env.PORT || 8080;

// Error handling
app.use((err, req, res, next) => {
  res.status(400).json({
    error: process.env.NODE_ENV == "production" ? "An error occured" : err.message,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});
