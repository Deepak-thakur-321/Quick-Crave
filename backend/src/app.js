// Create Server in this file //
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoutes = require("../src/routes/userRoutes")
const foodRoutes = require("../src/routes/foodRoutes")


const app = express();

// middlewares //
app.use(express.json());
app.use(cors());
app.use(morgan("dev")); 
app.use(cookieParser());

// routes //
app.use("/api/auth", authRoutes); // /api/auth  ye prifix hai  inko lgana hai authRoutes me
app.use("/api/food", foodRoutes); // /api/auth  ye prifix hai  inko lgana hai authRoutes me




module.exports = app;