const express = require("express");
const mongoose = require("mongoose");
const userModel = require("../models/User.model");
const foodModel = require("../models/foodpartner.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = express.Router();

// User ko  Register krne ka function bana diya
async function registerUser(req, res) {

  const { fullName, email, password } = req.body;

  // Check user already exists or not  
  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists"
    });
  }

  // Password ko hash kiya hai database ke liye //
  const hashPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = await userModel.create({
    fullName,
    email,
    password: hashPassword
  });

  // Token ko generate kiya //
  const token = jwt.sign({
    id: newUser._id,
    email: newUser.email
  }, process.env.JWT_SECRET);

  // Token ko cookie me save kiya //
  res.cookie("token", token);

  await newUser.save();

  // Response send kiya message ke sath //
  res.status(201).json({
    message: "User registered successfully",
    newUser: {
      id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email
    }
  })

}

// User ko login krne ka function bana diya
async function loginUser(req, res) {
  try {
    // frontend se email or password le rhe hai
    const { email, password } = req.body

    // Database se check kr rhe hai ki user Exist krta hai ya nhi
    const user = await userModel.findOne({ email })

    if (!user) {
      return res.status(400).json({ // Agar user nhi mila to ye msg bhej do
        message: "Invalid email and password"
      })
    }

    // Password ko verify kr rhe hai  =========== enter password va hash password
    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
      // agar password galat hai 
      return res.status(400).json({
        message: "Password is not correct"
      })
    }

    // Token ko generate kiya
    const token = jwt.sign({
      id: user._id,
      email: user.email
    }, process.env.JWT_SECRET)

    // Token ko cookie me save kiya
    res.cookie("token", token)

    // Success response bhej diya login successfully
    res.status(200).json({
      message: "Login successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email
      }
    })

    // Agar koi error aa jaye to (server/database related)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Something went wrong"
    })
  }
}

// User Ko Logout krne ka function bana diya
function logoutUser(req, res) {
  res.clearCookie("token")
  res.status(200).json({
    message: "User Logout Successfully"
  })
}

// Food partner ko register krne ka function bana diya
async function registerFoodPartner(req, res) {
  const { email, password, name } = req.body

  const existingFoodPartner = await foodModel.findOne({ email })

  if (existingFoodPartner) {
    return res.status(400).json({
      message: "User already exists"
    }) // run res.status
  }

  const hashPassword = await bcrypt.hash(password, 10)

  const newFoodPartner = await foodModel.create({
    name,
    email,
    password: hashPassword,
  })

  const token = jwt.sign({
    id: newFoodPartner._id,
    email: newFoodPartner.email
  }, process.env.JWT_SECRET)

  res.cookie("token", token)

  res.status(201).json({
    message: "Food partner registered successfully",
    newFoodPartner: {
      id: newFoodPartner._id,
      name: newFoodPartner.name,
      email: newFoodPartner.email
    }
  })
}

// Food partner ko login krne ka function bana diya
async function loginFoodPartner(req, res) {
  try {
    const { email, password } = req.body

    const foodPartner = await foodModel.findOne({ email })

    if (!foodPartner) {
      return res.status(400).json({
        message: "Invalid email and password"
      })
    }

    const isPasswordMatch = await bcrypt.compare(password, foodPartner.password)

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Password is not correct"
      })
    }

    const token = jwt.sign({
      id: foodPartner._id,
      email: foodPartner.email
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
      message: "Login successfully",
      foodPartner: {
        id: foodPartner._id,
        name: foodPartner.name,
        email: foodPartner.email
      }
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Something went wrong"
    })
  }
}

// Food partner ko logout krne ka function bana diya
function logoutFoodPartner(req, res) {
  res.clearCookie("token")
  res.status(200).json({
    message: "Food partner logout successfully"
  })
}

module.exports = router;
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner
}
