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

// Update Hobby
exports.updateHobby = async (req, res) => {
  try {
    const { title, level, isPublic } = req.body;
    const hobby = await Hobby.findById(req.params.id);

    if (!hobby) {
      return res.status(404).json({ message: 'Hobby not found' });
    }

    if (hobby.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    hobby.title = title || hobby.title;
    hobby.level = level || hobby.level;
    hobby.isPublic = isPublic !== undefined ? isPublic : hobby.isPublic;

    await hobby.save();
    res.json(hobby);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Hobby
exports.deleteHobby = async (req, res) => {
  try {
    const hobby = await Hobby.findById(req.params.id);

    if (!hobby) {
      return res.status(404).json({ message: 'Hobby not found' });
    }

    if (hobby.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await hobby.deleteOne();
    res.json({ message: 'Hobby deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
