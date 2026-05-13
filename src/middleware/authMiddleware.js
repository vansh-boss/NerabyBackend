const jwt =
require("jsonwebtoken");

const User =
require("../models/User");

module.exports =
async (req, res, next) => {

  try {

    const token =
      req.headers.authorization
      ?.split(" ")[1];

    if (!token) {

      return res.status(401).json({
        message: "No token"
      });

    }

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    // ✅ ADMIN TOKEN

    if (decoded.role === "admin") {

      req.user = {
        role: "admin",
        email: decoded.email
      };

      return next();

    }

    // ✅ NORMAL USER

    req.user =
      await User.findById(decoded.id);

    if (!req.user) {

      return res.status(401).json({
        message: "User not found"
      });

    }

    next();

  } catch (error) {

    res.status(401).json({
      message: "Invalid token"
    });

  }

};