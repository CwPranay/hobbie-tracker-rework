const Session = require("../models/Session");
const Hobby = require("../models/Hobby");

// Get recent sessions across all hobbies for the authenticated user
exports.getRecentSessions = async (req, res) => {
  try {
    // Validate user authentication
    if (!req.user || !req.user._id) {
      console.error('[getRecentSessions] User not authenticated');
      return res.status(401).json({ 
        message: 'User not authenticated',
        success: false 
      });
    }

    console.log(`[getRecentSessions] Fetching recent sessions for user: ${req.user._id}`);

    // Fetch recent sessions with populated hobby data
    const sessions = await Session.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 }) // Sort by creation time, most recent first
      .limit(10) // Limit to 10 most recent sessions
      .populate('hobby', 'title level') // Populate hobby details
      .lean() // Convert to plain JavaScript objects for better performance
      .exec();

    console.log(`[getRecentSessions] Found ${sessions.length} sessions`);

    // Return sessions (empty array if none found)
    res.status(200).json(sessions);

  } catch (error) {
    console.error('[getRecentSessions] Error:', error.message);
    console.error('[getRecentSessions] Stack:', error.stack);
    
    // Handle specific MongoDB errors
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: 'Invalid user ID format',
        success: false 
      });
    }

    // Generic error response
    res.status(500).json({ 
      message: 'Failed to fetch recent sessions',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      success: false 
    });
  }
};

exports.addSession = async (req, res) => {
  try {
    const { duration, notes, date } = req.body;
    const hobbyId = req.params.hobbyId;

    // Validate required fields
    if (!duration || duration <= 0) {
      return res.status(400).json({ 
        message: 'Duration must be greater than 0',
        success: false 
      });
    }

    if (!hobbyId) {
      return res.status(400).json({ 
        message: 'Hobby ID is required',
        success: false 
      });
    }

    console.log(`[addSession] Adding session for hobby: ${hobbyId}, user: ${req.user._id}`);

    // Create Session
    const session = await Session.create({
      user: req.user._id,
      hobby: hobbyId,
      date: date ? new Date(date) : new Date(),
      duration,
      notes,
    });

    console.log(`[addSession] Session created: ${session._id}`);

    // Fetch all sessions for streak calculation
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

    // Update hobby with new streak data
    await Hobby.findByIdAndUpdate(hobbyId, {
      currentStreak: streak,
      longestStreak: longest,
    });

    console.log(`[addSession] Hobby updated with streaks - current: ${streak}, longest: ${longest}`);

    res.status(201).json(session);
  } catch (error) {
    console.error('[addSession] Error:', error.message);
    console.error('[addSession] Stack:', error.stack);

    // Handle specific errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error',
        errors: Object.values(error.errors).map(e => e.message),
        success: false 
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: 'Invalid ID format',
        success: false 
      });
    }

    res.status(500).json({ 
      message: 'Failed to add session',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      success: false 
    });
  }
};

exports.getSessions = async (req, res) => {
  try {
    const hobbyId = req.params.hobbyId;

    // Validate hobby ID
    if (!hobbyId) {
      return res.status(400).json({ 
        message: 'Hobby ID is required',
        success: false 
      });
    }

    console.log(`[getSessions] Fetching sessions for hobby: ${hobbyId}, user: ${req.user._id}`);

    const sessions = await Session.find({
      user: req.user._id,
      hobby: hobbyId,
    }).sort({ date: -1 });

    console.log(`[getSessions] Found ${sessions.length} sessions`);

    res.status(200).json(sessions);
  } catch (error) {
    console.error('[getSessions] Error:', error.message);
    console.error('[getSessions] Stack:', error.stack);

    if (error.name === 'CastError') {
      return res.status(400).json({ 
        message: 'Invalid hobby ID format',
        success: false 
      });
    }

    res.status(500).json({ 
      message: 'Failed to fetch sessions',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      success: false 
    });
  }
};
