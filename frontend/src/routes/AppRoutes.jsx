import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Auth Pages
import UserRegister from "../pages/auth/UserRegister";
import UserLogin from "../pages/auth/UserLogin";
import ChooseRegister from "../pages/auth/ChooseRegister";
import FoodPartnerRegister from "../pages/auth/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/auth/FoodPartnerLogin";

// General Pages
import Home from "../pages/general/Home";
import Saved from "../pages/general/Saved";

// Partner Pages
import CreateFood from "../pages/food-partner/CreateFood";
import Profile from "../pages/food-partner/Profile";
// import PartnerDashboard from "../pages/food-partner/PartnerDashboard"; // optional

// Components
// import BottomNav from "../components/BottomNav";
import ProtectedRoute from "../components/protectedRoute/ProtectedRoute";

const AppRoutes = () => {
   const { user, partner } = useContext(AuthContext);

   return (
      <Router>
         <Routes>
            {/* Public Routes */}
            <Route
               path="/user/register"
               element={!user ? <UserRegister /> : <Navigate to="/" replace />}
            />
            <Route
               path="/user/login"
               element={!user ? <UserLogin /> : <Navigate to="/" replace />}
            />
            <Route path="/register" element={<ChooseRegister />} />
            <Route
               path="/food-partner/register"
               element={!partner ? <FoodPartnerRegister /> : <Navigate to="/food-partner/dashboard" replace />}
            />
            <Route
               path="/food-partner/login"
               element={!partner ? <FoodPartnerLogin /> : <Navigate to="/food-partner/dashboard" replace />}
            />

            {/* USER Protected Routes */}
            <Route element={<ProtectedRoute type="user" />}>
               <Route path="/" element={<><Home /></>} />
               <Route path="/saved" element={<><Saved /></>} />
            </Route>

            {/* PARTNER Protected Routes */}
            <Route element={<ProtectedRoute type="partner" />}>
               {/* <Route path="/food-partner/dashboard" element={<PartnerDashboard />} /> */}
               <Route path="/create-food" element={<CreateFood />} />
               <Route path="/food-partner/:id" element={<Profile />} />
            </Route>

            {/* Catch-all */}
            <Route
               path="*"
               element={
                  user ? <Navigate to="/" replace /> :
                     partner ? <Navigate to="/food-partner/dashboard" replace /> :
                        <Navigate to="/register" replace />
               }
            />
         </Routes>
      </Router>
   );
};

export default AppRoutes;
