const foodPartnerModel = require("../models/foodpartner.model");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req, res, next) {
   // ✅ Corrected cookie access
   const token = req.cookies?.token;
   if (!token) {
      return res.status(401).json({
         message: "Please Login First",
      });
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const foodPartner = await foodPartnerModel.findById(decoded.id);

      // ✅ Null check
      if (!foodPartner) {
         return res.status(404).json({
            message: "Food Partner not found",
         });
      }

      req.foodPartner = foodPartner;
      next();
   } catch (error) {
      return res.status(401).json({
         message: "Invalid Token",
      });
   }
}

module.exports = { authFoodPartnerMiddleware };
