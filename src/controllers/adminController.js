const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


// ADMIN LOGIN


const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(400).json({
        message: "Wrong admin credentials"
      });
    }

    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      admin: {
        email,
        role: "admin"
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { adminLogin };


// DASHBOARD

const getDashboard = async (req, res) => {

  try {

    const users =
      await User.find();

    const activeUsers =
      users.filter(
        (u) => u.isOnline === true
      ).length;

    res.json({

      totalUsers:
        users.length,

      activeUsers,

      users

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {

  adminLogin,

  getDashboard

};