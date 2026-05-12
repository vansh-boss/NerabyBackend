const express = require("express");

const router = express.Router();

const User = require("../models/User");


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

    const users = await User.find()
      .select("-password");

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

module.exports = router;