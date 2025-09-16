// Start Server in this File //

const app = require("../backend/src/app");
const connectDB = require("../backend/src/db/db");
require("dotenv").config();

connectDB(); // connect Database

// Start server //
app.listen(4000, () => {
  console.log("Server running on port 4000");
});