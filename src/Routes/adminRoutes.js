const express = require("express");
const router = express.Router();

const { adminLogin, getDashboard, getAdmin } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// ADMIN LOGIN
router.post("/login", adminLogin);
router.get("/me", authMiddleware, adminMiddleware, getAdmin);
router.get("/dashboard", authMiddleware, adminMiddleware, getDashboard);

router.get("/admin", (req ,res)=>{
    return res.json("admin works");
});
module.exports = router;