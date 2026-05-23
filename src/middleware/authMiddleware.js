const jwt = require("jsonwebtoken");

const User = require("../models/User");

const protect = async (
  req,
  res,
  next
) => {

  try {

    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {

      return res.status(401).json({
        message: "No token"
      });

    }

    const token =
      authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (decoded.role === "admin") {

      req.user = {
        role: "admin",
        email: decoded.email
      };

      return next();

    }

    const user =
      await User.findById(decoded.id);

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    req.user = user;

    next();

  } catch (error) {

    res.status(401).json({
      message: "Invalid token"
    });

  }

};

module.exports = protect;