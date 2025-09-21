const jwt = require("jsonwebtoken");
const foodPartnerModel = require("../models/foodPartner.model");
const userModel = require("../models/user.model");


// Food Partner Middleware

async function authFoodPartnerMiddleware(req, res, next) {
  try {
    // 1. Check cookie
    let token = req.cookies?.foodPartner_token;

    // 2. If not in cookie, check Authorization header
    if (!token && req.headers.authorization) {
      const parts = req.headers.authorization.split(" ");
      if (parts[0] === "Bearer" && parts[1]) {
        token = parts[1];
      }
    }

    if (!token) {
      return res.status(401).json({ message: "No token found. Please login as food partner" });
    }

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Food Partner Token:", decoded);

    // 4. Find partner in DB
    const partner = await foodPartnerModel.findById(decoded.id);
    if (!partner) {
      return res.status(404).json({ message: "Food Partner not found" });
    }

    // 5. Attach to request
    req.foodPartner = partner;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
}


// User Middleware

async function authUserMiddleware(req, res, next) {
  try {
    // 1. Check cookie
    let token = req.cookies?.user_token;

    // 2. If not in cookie, check Authorization header
    if (!token && req.headers.authorization) {
      const parts = req.headers.authorization.split(" ");
      if (parts[0] === "Bearer" && parts[1]) {
        token = parts[1];
      }
    }

    if (!token) {
      return res.status(401).json({ message: "No token found. Please login as user" });
    }

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded User Token:", decoded);

    // 4. Find user in DB
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found, Invalid Token" });
    }

    // 5. Attach to request
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
}

module.exports = { authFoodPartnerMiddleware, authUserMiddleware };
