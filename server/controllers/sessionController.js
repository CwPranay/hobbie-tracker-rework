const Session = require("../models/Session");
const Hobby = require("../models/Hobby");


exports.addSession = async (req, res) => {
  try {
    const { duration, notes, date } = req.body;
    const hobbyId = req.params.hobbyId;

    // Create Session
    const session = await Session.create({
      user: req.user._id,
      hobby: hobbyId,
      date: date ? new Date(date) : new Date(),
      duration,
      notes,
    });

  
    const sessions = await Session.find({
      user: req.user._id,
      hobby: hobbyId,
    }).sort({ date: -1 });

    let streak = 1;
    let longest = 1;

    if (sessions.length > 1) {
      let current = 1;
      let max = 1;

      for (let i = 0; i < sessions.length - 1; i++) {
        const d1 = new Date(sessions[i].date);
        const d2 = new Date(sessions[i + 1].date);

        const diff =
          (d1.setHours(0, 0, 0, 0) - d2.setHours(0, 0, 0, 0)) /
          (1000 * 60 * 60 * 24);

        if (diff === 1) {
          current++;
          max = Math.max(max, current);
        } else {
          current = 1;
        }
      }

      streak = current;
      longest = max;
    }

   
    await Hobby.findByIdAndUpdate(hobbyId, {
      currentStreak: streak,
      longestStreak: longest,
    });

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getSessions = async (req, res) => {
  try {
    const hobbyId = req.params.hobbyId;

    const sessions = await Session.find({
      user: req.user._id,
      hobby: hobbyId,
    }).sort({ date: -1 });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
