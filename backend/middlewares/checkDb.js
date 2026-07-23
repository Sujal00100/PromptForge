const mongoose = require("mongoose");
const ApiResponse = require("../utils/ApiResponse");

/**
 * Middleware that checks if MongoDB is connected before
 * allowing the request to proceed. Returns 503 if the
 * database is unavailable.
 */
const checkDb = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return ApiResponse.error(
      res,
      503,
      "Database unavailable",
      "MongoDB is not connected. Please check your connection settings and ensure your IP is whitelisted on Atlas."
    );
  }
  next();
};

module.exports = checkDb;
