const User = require("../models/User");


// UPDATE LOCATION

const updateLocation = async (
  req,
  res
) => {

  try {

    const {
      userId,
      latitude,
      longitude
    } = req.body;

    const user =
      await User.findByIdAndUpdate(

        userId,

        {
          location: {
            type: "Point",
            coordinates: [
              Number(longitude),
              Number(latitude)
            ]
          }
        },

        { new: true }

      );

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// NEARBY USERS

const nearbyUsers = async (
  req,
  res
) => {

  try {

    const {
      lat,
      lng
    } = req.query;

    const users =
      await User.find({

        location: {

          $near: {

            $geometry: {

              type: "Point",

              coordinates: [
                Number(lng),
                Number(lat)
              ]

            },

            $maxDistance: 2000

          }

        }

      })

      .select(
        "name email bio age interests isOnline"
      );

    res.json({

      users

    });

  } catch (error) {

    res.status(500).json({

      message: error.message

    });

  }

};


// LOGOUT

const logoutUser = async (
  req,
  res
) => {

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


module.exports = {

  updateLocation,

  nearbyUsers,

  logoutUser

};