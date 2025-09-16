const express = require("express");
const {  registerUser, loginUser, logoutUser, registerFoodPartner, loginFoodPartner, logoutFoodPartner} = require('../controllers/userController')


const router = express.Router();

router.post("/user/register",  registerUser);
router.post("/user/login",  loginUser);
router.get("/user/logout", logoutUser)

router.post("/food-partner/register", registerFoodPartner)
router.post("/food-partner/login", loginFoodPartner)
router.get("/food-partner/logout", logoutFoodPartner)


module.exports = router;