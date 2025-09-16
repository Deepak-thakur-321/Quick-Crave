const express = require("express");
const router = express.Router();
const { createFood } = require("../controllers/food.controller")
const { authFoodPartnerMiddleware } = require("../middleware/auth.middleware")
const multer = require("multer");

const upload = multer({
   storage: multer.memoryStorage()
})

// POST /api/food/
router.post("/", authFoodPartnerMiddleware, upload.single("video"), createFood,)

module.exports = router;