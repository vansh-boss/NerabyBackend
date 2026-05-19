const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  getUserById
} = require("../controllers/authController");

const protect =
  require("../middleware/authMiddleware");

// REGISTER
router.post(
  "/register",
  registerUser
);

// LOGIN
router.post(
  "/login",
  loginUser
);

// GET CURRENT USER
router.get(
  "/me",
  protect,
  getUserById
);

// LOGOUT
router.post(
  "/logout",
  protect,
  logoutUser
);

module.exports = router;