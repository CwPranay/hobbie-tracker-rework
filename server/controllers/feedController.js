const Session = require("../models/Session");
const User = require("../models/User");
const Hobby = require("../models/Hobby");

exports.getFeed = async (req, res) => {
  try {
    // Get current user with following list
    const user = await User.findById(req.user._id);

    // Get sessions of followed users
    const sessions = await Session.find({
      user: { $in: user.following },
    })
      .sort({ date: -1 })
      .limit(20)
      .populate("user", "name")
      .populate("hobby", "title");

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
