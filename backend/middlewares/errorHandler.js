const ApiResponse = require("../utils/ApiResponse");

/**
 * Centralized error-handling middleware.
 * Must be registered LAST (after all routes) with 4 parameters.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, _next) => {
  console.error("❌ Error:", err.message);

  // Mongoose validation error → 400
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return ApiResponse.error(res, 400, "Validation failed", messages.join(". "));
  }

  // Mongoose bad ObjectId → 400
  if (err.name === "CastError" && err.kind === "ObjectId") {
    return ApiResponse.error(res, 400, "Invalid ID format");
  }

  // Mongoose duplicate key → 409
  if (err.code === 11000) {
    return ApiResponse.error(res, 409, "Duplicate entry");
  }

  // JSON parse error
  if (err.type === "entity.parse.failed") {
    return ApiResponse.error(res, 400, "Invalid JSON in request body");
  }

  // Default → 500
  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message || "Internal server error";

  return ApiResponse.error(res, statusCode, message);
};

module.exports = errorHandler;
