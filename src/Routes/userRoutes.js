const express = require("express");

const router = express.Router();

const User = require("../models/User");
const { getUserById } = require("../controllers/authController");

// ==========================
// NEARBY USERS
// ==========================

router.get("/nearby/list", async (req, res) => {

  try {

    const { lat, lng, radius } = req.query;

    const users = await User.find({

      location: {

        $near: {

          $geometry: {
            type: "Point",

            coordinates: [
              Number(lng),
              Number(lat)
            ]
          },

          $maxDistance:
            Number(radius || 5) * 1000
        }
      }

    }).select("-password");

    res.json({
      users
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

});


// ==========================
// ALL USERS
// ==========================

router.get("/", async (req, res) => {

  try {

    const users = await User.find().select("-password");

    res.json({
      users
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});


// ==========================
// SINGLE USER
// ==========================

router.get("/:id", async (req, res) => {

  try {

    const user = await User.findById(
      req.params.id
    ).select("-password");

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    res.json({ user });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

router.get("/auth/me", async (req, res) => {
  const Me = req.user; 
  try {
    if (!Me) {
      return res.status(401).json({ message: "Invalid or expired token" }); 
    }
    const user = await User.findById(Me._id || Me.id).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);

  } catch (err) {
    res.status(500).json({
      message: err.message,
      obj: Me ?? "no user"
    });
  }
});

module.exports = router;