const express =
require("express");

const router =
express.Router();

const {

  createShoutout,

  getShoutouts

} = require(
  "../controllers/shoutoutController"
);

const authMiddleware =
require("../middleware/authMiddleware");


// GET

router.get(
  "/",
  getShoutouts
);


// CREATE

router.post(
  "/",
  authMiddleware,
  createShoutout
);

module.exports = router;