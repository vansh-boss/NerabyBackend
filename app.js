const express = require("express");

const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

const authRoutes =
require("./src/routes/authRoutes");

const userRoutes =
require("./src/routes/userRoutes");

const chatRoutes =
require("./src/routes/chatRoutes");

const adminRoutes =
require("./src/routes/adminRoutes");

const shoutoutRoutes =
require("./src/routes/shoutoutRoutes");

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/shoutouts", shoutoutRoutes);

app.get("/", (req, res) => {

  res.send("API Running");

});

module.exports = app;