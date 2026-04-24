const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware (development only)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

// Health check route
app.get("/", (req, res) => {
  res.json({ 
    message: "API Running...",
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// API Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const hobbyRoutes = require("./routes/hobbyRoutes");
app.use("/api/hobbies", hobbyRoutes);

const sessionRoutes = require("./routes/sessionRoutes");
app.use("/api/sessions", sessionRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const feedRoutes = require("./routes/feedRoutes");
app.use("/api/feed", feedRoutes);

// 404 Handler - Must be after all routes
app.use((req, res) => {
  console.warn(`[404] Route not found: ${req.method} ${req.path}`);
  res.status(404).json({ 
    message: 'Route not found',
    path: req.path,
    method: req.method,
    success: false
  });
});

// Global Error Handler - Must be last
app.use((err, req, res, next) => {
  console.error('[Global Error Handler]');
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  console.error('Path:', req.path);
  console.error('Method:', req.method);

  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      errors: Object.values(err.errors).map(e => e.message),
      success: false
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'Invalid ID format',
      success: false
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: 'Invalid token',
      success: false
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      message: 'Token expired',
      success: false
    });
  }

  // Default error response
  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    success: false
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('[Unhandled Promise Rejection]');
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  // Don't exit in production, just log
  if (process.env.NODE_ENV === 'development') {
    console.error('Shutting down server due to unhandled promise rejection...');
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('[Uncaught Exception]');
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);
  console.error('Shutting down server due to uncaught exception...');
  process.exit(1);
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`[Server] Running on port ${PORT}`);
  console.log(`[Server] Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`[Server] Time: ${new Date().toISOString()}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[Server] SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('[Server] Process terminated');
  });
});

module.exports = app;
