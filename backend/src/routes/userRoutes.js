const express = require("express");
const {  registerUser, loginUser, logoutUser, registerFoodPartner, loginFoodPartner, logoutFoodPartner} = require('../controllers/userController')


const router = express.Router();

// User auth Api
router.post("/user/register",  registerUser);
router.post("/user/login",  loginUser);
router.get("/user/logout", logoutUser)


// Food Partner auth Api
router.post("/food-partner/register", registerFoodPartner)
router.post("/food-partner/login", loginFoodPartner)
router.get("/food-partner/logout", logoutFoodPartner)


module.exports = router;