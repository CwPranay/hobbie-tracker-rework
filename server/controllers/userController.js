const User = require("../models/User");
const Hobby = require("../models/Hobby");

// Follow User
exports.followUser = async (req, res) => {
  try {

    // Prevent self-follow
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }

    if (currentUser.following.includes(userToFollow._id)) {
      return res.status(400).json({ message: "Already following" });
    }

    currentUser.following.push(userToFollow._id);
    userToFollow.followers.push(currentUser._id);

    await currentUser.save();
    await userToFollow.save();

    res.json({ message: "User followed" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.unfollowUser = async (req, res) => {
  try {

    // Prevent self-unfollow
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({ message: "You cannot unfollow yourself" });
    }

    const userToUnfollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user._id);

    if (!userToUnfollow) {
      return res.status(404).json({ message: "User not found" });
    }

    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== req.params.id
    );

    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id) => id.toString() !== req.user._id.toString()
    );

    await currentUser.save();
    await userToUnfollow.save();

    res.json({ message: "User unfollowed" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// View Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("followers", "name")
      .populate("following", "name");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let hobbies;

    if (req.user._id.toString() === user._id.toString()) {
      // Own profile → see all
      hobbies = await Hobby.find({ user: user._id });
    } else {
      // Others → only public
      hobbies = await Hobby.find({
        user: user._id,
        isPublic: true,
      });
    }


    res.json({ user, hobbies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Search Users
exports.searchUsers = async (req, res) => {
  try {
    const query = req.query.q;
    
    if (!query) {
      return res.json([]);
    }

    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ],
      _id: { $ne: req.user._id } // Exclude current user
    })
    .select('name email')
    .limit(10);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
