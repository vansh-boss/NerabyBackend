// models/Shoutout.js

const mongoose =
require("mongoose");

const shoutoutSchema =
new mongoose.Schema({

  user: {

    type:
      mongoose.Schema.Types.ObjectId,

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

  }

},
{
  timestamps: true
});

module.exports =
mongoose.model(
  "Shoutout",
  shoutoutSchema
);