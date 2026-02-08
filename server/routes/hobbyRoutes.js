const express = require("express");
const {
  createHobby,
  getHobbies,
  updateHobby,
  deleteHobby,
} = require("../controllers/hobbyController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createHobby);
router.get("/", protect, getHobbies);
router.put("/:id", protect, updateHobby);
router.delete("/:id", protect, deleteHobby);

module.exports = router;
