const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

/**
 * Centralized configuration.
 * All environment variables are accessed here with sensible defaults.
 */
const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  mongodbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/promptforge",
  nodeEnv: process.env.NODE_ENV || "development",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000",
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000, // 15 min
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100,
};

module.exports = config;
