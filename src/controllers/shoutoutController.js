const Shoutout =
require("../models/Shoutout");

const User =
require("../models/User");


// ==========================
// CREATE SHOUTOUT
// ==========================

exports.createShoutout =
async (req, res) => {

  try {

    const {
      message,
      interest,
      timing
    } = req.body;

    const shoutout =
      await Shoutout.create({

        user: req.user._id,

        message,

        interest,

        timing

      });

    const populated =
    await shoutout.populate(
      "user",
      "name email bio"
    );

    // ✅ SOCKET SAFE CHECK
    const io =
req.app.get("io");

if (io) {

  io.emit(
    "new_shoutout",
    populated
  );

}
    res.status(201).json({
      shoutout: populated
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

};


// ==========================
// GET SHOUTOUTS
// ==========================

exports.getShoutouts =
async (req, res) => {

  try {

    const {
      interest,
      lat,
      lng,
      radius
    } = req.query;

    let userFilter = {};

    // LOCATION FILTER
    if (lat && lng) {

      userFilter.location = {

        $near: {

          $geometry: {

            type: "Point",

            coordinates: [
              Number(lng),
              Number(lat)
            ]

          },

          $maxDistance:
            Number(radius || 2) * 1000

        }

      };

    }

    const nearbyUsers =
      await User.find(userFilter)
      .select("_id");

    const userIds =
      nearbyUsers.map(
        (u) => u._id
      );

    let query = {

      user: {
        $in: userIds
      }

    };

    // INTEREST FILTER
    if (
      interest &&
      interest !== "all"
    ) {

      query.interest =
        interest;

    }

    const shoutouts =
      await Shoutout.find(query)

        .populate(
          "user",
          "name email bio"
        )

        .sort({
          createdAt: -1
        });

    res.json({
      shoutouts
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

};