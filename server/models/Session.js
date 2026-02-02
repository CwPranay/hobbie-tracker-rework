const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    hobby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hobby",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    duration: {
      type: Number, // minutes
      required: true,
    },

    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);
