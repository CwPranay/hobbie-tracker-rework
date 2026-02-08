const express = require("express");
const {
  followUser,
  unfollowUser,
  getProfile,
  searchUsers,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/follow/:id", protect, followUser);
router.post("/unfollow/:id", protect, unfollowUser);
router.get("/profile/:id", protect, getProfile);
router.get("/search", protect, searchUsers);

module.exports = router;
