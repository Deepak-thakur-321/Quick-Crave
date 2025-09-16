const mongoose = require("mongoose");

const foodPartnerSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
   }
}, { timestamps: true });

const foodModel = mongoose.model("FoodPartner", foodPartnerSchema);

module.exports = foodModel;