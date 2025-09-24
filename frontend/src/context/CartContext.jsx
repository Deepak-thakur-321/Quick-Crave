import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
   const [cart, setCart] = useState([]);

   // Load cart from localStorage on start
   useEffect(() => {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(savedCart);
   }, []);

   // Save cart to localStorage whenever it changes
   useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
   }, [cart]);

   // Add item to cart
   const addToCart = (food) => {
      setCart((prev) => {
         const exists = prev.find((item) => item._id === food._id);
         if (exists) {
            return prev.map((item) =>
               item._id === food._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
            );
         } else {
            return [...prev, { ...food, quantity: 1 }];
         }
      });
   };

   // Remove item from cart
   const removeFromCart = (foodId) => {
      setCart((prev) => prev.filter((item) => item._id !== foodId));
   };

   // Clear cart after checkout
   const clearCart = () => {
      setCart([]);
   };

   return (
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
         {children}
      </CartContext.Provider>
   );
};

export default CartProvider;
