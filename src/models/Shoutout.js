const mongoose = require("mongoose");

const shoutoutSchema = new mongoose.Schema(

  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    message: {
      type: String,
      required: true
    },

    interest: {
      type: String,
      required: true
    },

    timing: {
      type: String,
      default: "now"
    },

    // ✅ IMPORTANT
    radius: {
      type: Number,
      default: 2
    }

  },

  {
    timestamps: true
  }

);

module.exports =
  mongoose.model(
    "Shoutout",
    shoutoutSchema
  );