const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
   try {
      console.log(req.foodPartner);
      console.log(req.body);
      console.log(req.file);

      if (!req.file) {
         return res.status(400).json({ message: "No file uploaded" });
      }

      const fileBuffer = req.file.buffer.toString("base64");

      const fileUploadResult = await storageService.uploadImage(fileBuffer, `${uuid()}.${req.file.originalname}`);

      const foodItem = await foodModel.create({
         name: req.body.name,
         video: fileUploadResult,
         description: req.body.description,
         foodPartner: req.foodPartner._id,
      });

      res.status(201).json({
         message: "Food item created successfully",
         food: foodItem,
      });
   } catch (error) {
      console.error("Error creating food:", error);
      res.status(500).json({ message: "Server error", error: error.message });
   }
}


async function getFoodItems(req, res) {
   try {
      const foodItems = await foodModel.find({ foodPartner: req.foodPartner._id });
      res.status(200).json({ message: "Successfully fetched food items", foodItems });
   } catch (error) {
      console.error("Error fetching food items:", error);
      res.status(500).json({ message: "Server error", error: error.message });
   }
}


async function likeFood(req, res) {
   const { foodId } = req.body;
   const user = req.user;

   const isAlreadyLiked = await likeModel.findOne({
      user: user._id,
      food: foodId
   })

   if (isAlreadyLiked) {
      await likeModel.deleteOne({
         user: user._id,
         food: foodId
      })

      await foodModel.findByIdAndUpdate(foodId, {
         $inc: { likeCount: -1 }
      })

      return res.status(200).json({
         message: "Food unliked successfully"
      })
   }

   const like = await likeModel.create({
      user: user._id,
      food: foodId
   })

   await foodModel.findByIdAndUpdate(foodId, {
      $inc: { likeCount: 1 }
   })

   res.status(201).json({
      message: "Food liked successfully",
      like
   })

}

async function saveFood(req, res) {

   const { foodId } = req.body;
   const user = req.user;

   const isAlreadySaved = await saveModel.findOne({
      user: user._id,
      food: foodId
   })

   if (isAlreadySaved) {
      await saveModel.deleteOne({
         user: user._id,
         food: foodId
      })

      await foodModel.findByIdAndUpdate(foodId, {
         $inc: { savesCount: -1 }
      })

      return res.status(200).json({
         message: "Food unsaved successfully"
      })
   }

   const save = await saveModel.create({
      user: user._id,
      food: foodId
   })

   await foodModel.findByIdAndUpdate(foodId, {
      $inc: { savesCount: 1 }
   })

   res.status(201).json({
      message: "Food saved successfully",
      save
   })

}

async function getSaveFood(req, res) {

   const user = req.user;

   const savedFoods = await saveModel.find({ user: user._id }).populate('food');

   if (!savedFoods || savedFoods.length === 0) {
      return res.status(404).json({ message: "No saved foods found" });
   }

   res.status(200).json({
      message: "Saved foods retrieved successfully",
      savedFoods
   });

}


module.exports = {
   createFood, getFoodItems, getSaveFood, likeFood, saveFood
};
