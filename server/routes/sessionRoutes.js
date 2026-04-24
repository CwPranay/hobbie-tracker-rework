const express = require("express");
const {
  addSession,
  getSessions,
  getRecentSessions,
} = require("../controllers/sessionController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get recent sessions across all hobbies (must be before /:hobbyId to avoid route conflict)
router.get("/recent", protect, getRecentSessions);

// Add and get sessions for a specific hobby
router.post("/:hobbyId", protect, addSession);
router.get("/:hobbyId", protect, getSessions);

module.exports = router;
