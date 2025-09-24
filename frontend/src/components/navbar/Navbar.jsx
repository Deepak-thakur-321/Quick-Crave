import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
   const { user, partner, logout } = useContext(AuthContext);
   const navigate = useNavigate();

   const handleLogout = () => {
      logout();
      navigate("/user/login"); // instead of /login
   };


   return (
      <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
         {/* Logo */}
         <Link to="/" className="text-2xl font-bold text-red-500">
            🍔 Zomato Clone
         </Link>

         {/* Links */}
         <div className="flex gap-6">
            {/* Common links */}
            <Link to="/">Home</Link>
            <Link to="/reels">Reels</Link>

            {/* User-specific links */}
            {user && (
               <>
                  <Link to="/cart">Cart</Link>
                  <Link to="/orders">Orders</Link>
                  <Link to="/profile">Profile</Link>
               </>
            )}

            {/* Food Partner-specific links */}
            {partner && (
               <>
                  <Link to="/food-partner/dashboard">Dashboard</Link>
                  <Link to="/food-partner/add-food">Add Food</Link>
                  <Link to="/food-partner/orders">Orders</Link>
                  <Link to="/food-partner/profile">Profile</Link>
               </>
            )}

            {/* If not logged in */}
            {!user && !partner && (
               <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
               </>
            )}

            {/* Logout button */}
            {(user || partner) && (
               <button
                  onClick={handleLogout}
                  className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
               >
                  Logout
               </button>
            )}
         </div>
      </nav>
   );
};

export default Navbar;
