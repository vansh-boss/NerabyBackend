const mongoose =
require("mongoose");

const userSchema =
new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  bio: {
    type: String,
    default: ""
  },

  age: {
    type: Number,
    default: 18
  },

  interests: [
    String
  ],

  role: {
    type: String,
    default: "user"
  },

  phone: {
    type: String,
    default: ""
  },

  isOnline: {
    type: Boolean,
    default: false
  },

  location: {

    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },

    coordinates: {

      type: [Number],

      default: [77.2090, 28.6139]

      // [lon, lat]

    }

  }

},

{
  timestamps: true
});

userSchema.index({
  location: "2dsphere"
});

module.exports =
mongoose.model(
  "User",
  userSchema
);