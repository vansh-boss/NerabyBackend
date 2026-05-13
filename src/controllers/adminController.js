const User =
require("../models/User");

const jwt =
require("jsonwebtoken");


// =======================
// ADMIN LOGIN
// =======================

const adminLogin =
async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;


    // ✅ DEBUG LOGS

    console.log(
      "ENV EMAIL:",
      process.env.ADMIN_EMAIL
    );

    console.log(
      "ENV PASSWORD:",
      process.env.ADMIN_PASSWORD
    );

    console.log(
      "FRONTEND EMAIL:",
      email
    );

    console.log(
      "FRONTEND PASSWORD:",
      password
    );


    // ✅ CHECK

    if (

      email !== process.env.ADMIN_EMAIL ||

      password !== process.env.ADMIN_PASSWORD

    ) {

      return res.status(400).json({

        message:
        "Wrong admin credentials"

      });

    }


    // ✅ TOKEN

    const token =
      jwt.sign(

        {

          role: "admin",

          email

        },

        process.env.JWT_SECRET,

        {

          expiresIn: "7d"

        }

      );


    // ✅ RESPONSE

    res.json({

      token,

      admin: {

        email,

        role: "admin"

      }

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
      error.message

    });

  }

};


// =======================
// DASHBOARD
// =======================

const getDashboard =
async (req, res) => {

  try {

    const users =
      await User.find();

    const activeUsers =
      users.filter(
        (u) => u.isOnline
      ).length;

    res.json({

      totalUsers:
      users.length,

      activeUsers,

      users

    });

  } catch (error) {

    res.status(500).json({

      message:
      error.message

    });

  }

};


// =======================
// EXPORT
// =======================

module.exports = {

  adminLogin,

  getDashboard

};