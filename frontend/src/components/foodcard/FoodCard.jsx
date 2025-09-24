import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const FoodCard = ({ food }) => {
   const { addToCart } = useContext(CartContext);

   return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-64">
         <img
            src={food.image}
            alt={food.name}
            className="h-40 w-full object-cover"
         />
         <div className="p-4">
            <h3 className="text-lg font-bold">{food.name}</h3>
            <p className="text-gray-600">₹{food.price}</p>
            <button
               onClick={() => addToCart(food)}
               className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
               Add to Cart
            </button>
         </div>
      </div>
   );
};

export default FoodCard;
