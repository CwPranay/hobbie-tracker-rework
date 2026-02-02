const Hobby = require("../models/Hobby");

exports.createHobby = async (req, res) => {
  try {
    const { title, level, isPublic } = req.body;

    const hobby = await Hobby.create({
      user: req.user._id,
      title,
      level,
      isPublic,
    });

    res.status(201).json(hobby);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get User Hobbies
exports.getHobbies = async (req, res) => {
  try {
    const hobbies = await Hobby.find({ user: req.user._id });

    res.json(hobbies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
