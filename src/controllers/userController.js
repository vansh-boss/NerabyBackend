const User = require("../models/User");


// ==========================
// UPDATE LOCATION
// ==========================

exports.updateLocation = async (req, res) => {

  try {

    const { lat, lng } = req.body;

    await User.findByIdAndUpdate(

      req.user._id,

      {

        location: {

          type: "Point",

          coordinates: [
            Number(lng),
            Number(lat)
          ]

        }

      }

    );

    res.json({

      message: "Location updated"

    });

  } catch (err) {

    res.status(500).json({

      message: err.message

    });

  }

};


// ==========================
// NEARBY USERS
// ==========================

exports.nearbyUsers = async (req, res) => {

  try {

    const {
      lat,
      lng,
      radius
    } = req.query;

    const users =
      await User.aggregate([

        // ❌ CURRENT USER HIDE
        {
          $match: {
            _id: {
              $ne: req.user._id
            }
          }
        },

        // ✅ GEO SEARCH
        {
          $geoNear: {

            near: {

              type: "Point",

              coordinates: [
                Number(lng),
                Number(lat)
              ]

            },

            distanceField:
              "distance",

            maxDistance:
              Number(radius || 2) * 1000,

            spherical: true

          }

        },

        // ✅ RETURN DATA
        {
          $project: {

            name: 1,
            email: 1,
            bio: 1,
            age: 1,
            interests: 1,
            isOnline: 1,

            distanceKm: {

              $divide: [
                "$distance",
                1000
              ]

            }

          }

        }

      ]);

    res.json({

      users

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message: error.message

    });

  }

};


// ==========================
// LOGOUT
// ==========================

exports.logoutUser = async (req, res) => {

  try {

    await User.findByIdAndUpdate(

      req.user.id,

      {

        isOnline: false

      }

    );

    res.json({

      message: "Logout success"

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};