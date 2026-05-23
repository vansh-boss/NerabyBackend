const mongoose = require("mongoose");

async function connectDB() {
  try {
    console.log("MONGO CHECK:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI,{
  // Add this option globally 
  bufferCommands: false, 
})
.then(() => console.log("🚀 MongoDB Connected Successfully"))
.catch(err => console.error("❌ DB Connection Error:", err));

    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.log("MongoDB Connection Failed ❌", err);
    process.exit(1);
  }
}

module.exports = connectDB;