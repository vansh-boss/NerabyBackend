const mongoose = require("mongoose");

async function connectDB() {
  try {
    console.log("MONGO CHECK:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.log("MongoDB Connection Failed ❌", err);
    process.exit(1);
  }
}

module.exports = connectDB;