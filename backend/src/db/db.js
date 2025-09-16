// Database Connection Yha build Hota hai //

const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected Successfully");
  } catch (err) {
    console.log("DB Connection Error:", err);
    process.exit(1);
  }
}

module.exports = connectDB; // function ko export kr diya hai //