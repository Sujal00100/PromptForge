const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");

const connectDB = require("./config/db");
const config = require("./config");
const errorHandler = require("./middlewares/errorHandler");
const checkDb = require("./middlewares/checkDb");
const promptRoutes = require("./routes/promptRoutes");

// ─── Initialize Express ───────────────────────────────────────────

const app = express();

// ─── Security Middleware ──────────────────────────────────────────

// Helmet — sets various HTTP security headers
app.use(helmet());

// CORS — allow frontend origin
app.use(
  cors({
    origin: config.corsOrigin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Rate limiting — protect against brute-force
const limiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests, please try again later",
  },
});
app.use("/api", limiter);

// ─── Body Parsing ─────────────────────────────────────────────────

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));

// Input sanitization — prevent NoSQL injection
app.use(mongoSanitize());

// ─── Logging ──────────────────────────────────────────────────────

if (config.nodeEnv !== "test") {
  app.use(morgan(config.nodeEnv === "production" ? "combined" : "dev"));
}

// ─── Routes ───────────────────────────────────────────────────────

app.use("/api/prompts", checkDb, promptRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "PromptForge API is running",
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`,
  });
});

// ─── Error Handling (must be last) ────────────────────────────────

app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────

const startServer = async () => {
  // Connect to MongoDB
  await connectDB(config.mongodbUri);

  const server = app.listen(config.port, () => {
    console.log(
      `🚀 PromptForge API running on port ${config.port} [${config.nodeEnv}]`
    );
  });

  // Graceful shutdown
  const shutdown = async (signal) => {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    server.close(async () => {
      const mongoose = require("mongoose");
      await mongoose.connection.close();
      console.log("MongoDB connection closed.");
      process.exit(0);
    });
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
};

startServer();

module.exports = app; // Export for testing
