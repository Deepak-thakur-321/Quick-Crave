// Start Server in this File //
require("dotenv").config();
const mongoose = require("mongoose");
const app = require("../backend/src/app");
const connectDB = require("../backend/src/db/db");

connectDB(); // connect Database

// Start server //
app.listen(4000, () => {
  console.log("Server running on port 4000");
});