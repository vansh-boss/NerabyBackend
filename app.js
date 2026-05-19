const express = require("express");

const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(

  cors({

    origin:[
    
    // "https://nearby-vcri.vercel.app",
     "http://localhost:5173"

   ] ,
   methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE"
    ],

    credentials: true,

  })

);

app.use(express.json());


// ROUTES

const authRoutes =
require("./src/Routes/authRoutes");

const userRoutes =
require("./src/Routes/userRoutes");

const chatRoutes =
require("./src/Routes/chatRoutes");

const adminRoutes =
require("./src/Routes/adminRoutes");

const shoutoutRoutes =
require("./src/Routes/shoutoutRoutes");


// API ROUTES

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/users",
  userRoutes
);

app.use(
  "/api/chat",
  chatRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/shoutouts",
  shoutoutRoutes
);


// TEST ROUTE

app.get("/", (req, res) => {

  res.send("API Running");

});

module.exports = app;