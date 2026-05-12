const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");



// REGISTER

async function registerUser(req, res) {

  try {

    const {
      name,
      email,
      password,
      bio,
      age,
      interests,
      lat,
      lng
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists"
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({

      name,
      email,

      password: hashedPassword,

      bio,
      age,
      interests,

      role: "user",

      isOnline: true,

      location: {

        type: "Point",

        coordinates: [
          lng || 0,
          lat || 0
        ]

      }

    });

    const token = jwt.sign(

      { id: user._id },

      process.env.JWT_SECRET,

      { expiresIn: "7d" }

    );

    res.status(201).json({

      token,

      user: {

        _id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        age: user.age,
        interests: user.interests,
        role: user.role,
        isOnline: user.isOnline

      }

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

}


// LOGIN

async function loginUser(req, res) {

  try {

    const {
      email,
      password,
      role
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "Invalid Email"
      });

    }

    const match =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!match) {

      return res.status(400).json({
        message: "Invalid Password"
      });

    }

    // ADMIN CHECK

    if (
      role === "admin" &&
      user.role !== "admin"
    ) {

      return res.status(401).json({
        message: "Not Admin"
      });

    }

    // ONLINE TRUE

    user.isOnline = true;

    await user.save();

    const token = jwt.sign(

      {
        id: user._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );

    res.json({

      token,

      user: {

        _id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        age: user.age,
        interests: user.interests,
        role: user.role,
        isOnline: user.isOnline

      }

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

}


// LOGOUT

async function logoutUser(req, res) {

  try {

    const user =
      await User.findById(req.user.id);

    if (user) {

      user.isOnline = false;

      await user.save();

    }

    res.json({
      message: "Logout Success"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

}

async function getUserById(req, res) {

  try {

    const user =
      await User.findById(
        req.params.id
      );

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    res.json({
      user
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

}

module.exports = {

  registerUser,
  loginUser,
  logoutUser,
    getUserById

};