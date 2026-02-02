const express = require("express");
const {
  followUser,
  unfollowUser,
  getProfile,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/follow/:id", protect, followUser);
router.post("/unfollow/:id", protect, unfollowUser);
router.get("/profile/:id", protect, getProfile);

module.exports = router;
