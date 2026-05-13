const express =
require("express");

const router =
express.Router();

const {

  adminLogin,
  getDashboard

} = require(
  "../controllers/adminController"
);

const authMiddleware =
require("../middleware/authMiddleware");

const adminMiddleware =
require("../middleware/adminMiddleware");


// ADMIN LOGIN

router.post(
  "/login",
  adminLogin
);


// ADMIN DASHBOARD

router.get(

  "/dashboard",

  authMiddleware,

  adminMiddleware,

  getDashboard

);

module.exports = router;