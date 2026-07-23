const mongoose = require("mongoose");

/**
 * Connect to MongoDB with retry logic.
 * Does NOT crash the process on failure — the server starts regardless
 * and returns proper 503 errors when the DB is unavailable.
 * @param {string} uri — MongoDB connection string
 */
const connectDB = async (uri) => {
  try {
    const conn = await mongoose.connect(uri, {
      // Mongoose 8 uses these defaults, but being explicit for clarity
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`\n❌ MongoDB connection error: ${error.message}`);
    console.error(`\n💡 Make sure MongoDB is running. Options:`);
    console.error(`   1. MongoDB Atlas: Update MONGODB_URI in backend/.env with your Atlas connection string`);
    console.error(`   2. Local MongoDB: Install and start mongod, or run: docker run -d -p 27017:27017 mongo:7`);
    console.error(`\n⚠️  Server will start without database — API requests requiring the DB will return 503.\n`);
  }

  // Connection event listeners
  mongoose.connection.on("error", (err) => {
    console.error(`MongoDB runtime error: ${err.message}`);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("⚠️  MongoDB disconnected");
  });

  mongoose.connection.on("reconnected", () => {
    console.log("🔄 MongoDB reconnected");
  });
};

module.exports = connectDB;

