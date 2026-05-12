const express = require("express");

const router = express.Router();

const {

  adminLogin,
  getDashboard

} = require("../controllers/adminController");


router.post(
  "/login",
  adminLogin
);

router.get(
  "/dashboard",
  getDashboard
);

module.exports = router;