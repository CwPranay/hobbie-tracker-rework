const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Validate MongoDB URI
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    console.log('[MongoDB] Attempting to connect...');

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // These options are now default in Mongoose 6+, but explicit for clarity
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });

    console.log(`[MongoDB] Connected successfully to: ${conn.connection.host}`);
    console.log(`[MongoDB] Database name: ${conn.connection.name}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('[MongoDB] Connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('[MongoDB] Disconnected from database');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('[MongoDB] Reconnected to database');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        console.log('[MongoDB] Connection closed through app termination');
        process.exit(0);
      } catch (err) {
        console.error('[MongoDB] Error during shutdown:', err);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error('[MongoDB] Connection failed:', error.message);
    console.error('[MongoDB] Stack:', error.stack);
    
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
