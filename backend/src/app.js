// Create Server //
const express = require("express");
const cookieParser = require("cookie-parser");

const authRoutes = require("../src/routes/userRoutes")
const foodRoutes = require("../src/routes/foodRoutes")
const foodPartnerRoutes = require('../src/routes/food-partner.routes');

const cors = require("cors");
const app = express();


// middlewares //
app.use(express.json());
app.use(cors({
   origin: "http://localhost:5173",
   credentials: true
}));
app.use(cookieParser());

// routes //
app.use("/api/auth", authRoutes); // /api/auth  ye prifix hai  inko lgana hai authRoutes me
app.use("/api/food", foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes); // /api/auth  ye prifix hai  inko lgana hai authRoutes me

app.use((err, req, res, next) => {
   console.error(err);
   res.status(500).json({ message: 'Server error' });
});

module.exports = app;