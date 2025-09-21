const express = require("express");
const router = express.Router();
const { createFood, getFoodItems, getSaveFood, likeFood, saveFood } = require("../controllers/food.controller")
const { authFoodPartnerMiddleware, authUserMiddleware } = require("../middleware/auth.middleware")
const upload = require("../middleware/upload.middleware")
const multer = require("multer");

// const upload = multer({
//    storage: multer.memoryStorage()
// })

// POST /api/food/
router.post("/", authFoodPartnerMiddleware, upload.single("video"), createFood,)

router.get("/", authUserMiddleware, getFoodItems)


router.post('/like', authUserMiddleware, likeFood)


router.post('/save', authUserMiddleware, saveFood)


router.get('/save', authUserMiddleware, getSaveFood)

module.exports = router;