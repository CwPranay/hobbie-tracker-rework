const express = require("express");
const {
  addSession,
  getSessions,
} = require("../controllers/sessionController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:hobbyId", protect, addSession);
router.get("/:hobbyId", protect, getSessions);

module.exports = router;
