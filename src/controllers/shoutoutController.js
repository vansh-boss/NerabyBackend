// controllers/shoutoutController.js

const Shoutout =
require("../models/Shoutout");


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

    // CREATE
    const shoutout =
      await Shoutout.create({

        user: req.user.id,

        message,

        interest,

        timing

      });

    // POPULATE USER
    const populated =
      await Shoutout.findById(
        shoutout._id
      ).populate(
        "user",
        "name email"
      );

    // SOCKET
    const io =
      req.app.get("io");

    io.emit(
      "new_shoutout",
      populated
    );

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
// GET ALL SHOUTOUTS
// ==========================

exports.getShoutouts =
async (req, res) => {

  try {

    const {
      interest
    } = req.query;

    let query = {};

    // FILTER
    if (
      interest &&
      interest !== "all"
    ) {

      query.interest =
        interest;
    }

    // GET DATA
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