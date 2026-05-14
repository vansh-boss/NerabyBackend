const express = require("express");

const router = express.Router();

const {
  createShoutout,
  getShoutouts
} = require("../controllers/shoutoutController");

const protect =
require("../middleware/authMiddleware");


// GET SHOUTOUTS
router.get(
  "/",
  getShoutouts
);


// CREATE SHOUTOUT
router.post(
  "/",
  protect,
  createShoutout
);

module.exports = router;