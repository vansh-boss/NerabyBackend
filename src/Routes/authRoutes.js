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

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", protect, logoutUser);

router.get("/me", protect, getUserById);

module.exports = router;