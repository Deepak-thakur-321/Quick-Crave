const express = require("express");
const userModel = require("../models/User.model");
const foodPartnerModel = require("../models/foodpartner.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

// ====================== USER AUTH ======================

// Register User
async function registerUser(req, res) {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      fullName,
      email,
      password: hashPassword,
    });

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET
    );

    // ✅ Store in separate cookie
    res.cookie("user_token", token, { httpOnly: true });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

// Login User
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Password is not correct" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET
    );

    // ✅ Store in separate cookie
    res.cookie("user_token", token, { httpOnly: true });

    res.status(200).json({
      message: "Login successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

// Logout User
function logoutUser(req, res) {
  res.clearCookie("user_token");
  res.status(200).json({ message: "User Logout Successfully" });
}

// ====================== FOOD PARTNER AUTH ======================

// Register Food Partner
async function registerFoodPartner(req, res) {
  try {
    const { name, email, password, phone, address, contactName } = req.body;

    const existingFoodPartner = await foodPartnerModel.findOne({ email });
    if (existingFoodPartner) {
      return res.status(400).json({ message: "Food Partner already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newFoodPartner = await foodPartnerModel.create({
      name,
      email,
      password: hashPassword,
      phone,
      address,
      contactName
    });

    const token = jwt.sign(
      { id: newFoodPartner._id, email: newFoodPartner.email },
      process.env.JWT_SECRET
    );

    // ✅ Store in separate cookie
    res.cookie("foodPartner_token", token, { httpOnly: true });

    res.status(201).json({
      message: "Food partner registered successfully",
      foodPartner: {
        id: newFoodPartner._id,
        name: newFoodPartner.name,
        email: newFoodPartner.email,
        address: newFoodPartner.address,
        phone: newFoodPartner.phone,
        contactName: newFoodPartner.contactName
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Invalid request: missing or empty fields" });
  }
}

// Login Food Partner
async function loginFoodPartner(req, res) {
  try {
    const { email, password } = req.body;
    const foodPartner = await foodPartnerModel.findOne({ email });

    if (!foodPartner) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, foodPartner.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Password is not correct" });
    }

    const token = jwt.sign(
      { id: foodPartner._id, email: foodPartner.email },
      process.env.JWT_SECRET
    );

    // ✅ Store in separate cookie
    res.cookie("foodPartner_token", token, { httpOnly: true });

    res.status(200).json({
      message: "Login successfully",
      foodPartner: {
        id: foodPartner._id,
        name: foodPartner.name,
        email: foodPartner.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

// Logout Food Partner
function logoutFoodPartner(req, res) {
  res.clearCookie("foodPartner_token");
  res.status(200).json({ message: "Food partner Logout Successfully" });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};
