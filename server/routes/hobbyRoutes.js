const express = require("express");
const {
  createHobby,
  getHobbies,
} = require("../controllers/hobbyController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createHobby);
router.get("/", protect, getHobbies);

module.exports = router;
