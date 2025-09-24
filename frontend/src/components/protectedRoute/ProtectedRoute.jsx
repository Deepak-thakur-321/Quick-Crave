// src/components/ProtectedRoute.jsx
// import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// const ProtectedRoute = () => {
//    // const token = localStorage.getItem("user_token");
//    // if (!token) {
//    //    return <Navigate to="/user/login" replace />; // redirect to login if not logged in
//    // }
//    return <Outlet />; // render child routes
// };

const ProtectedRoute = () => {
   // const { user, partner } = useContext(AuthContext);

   // if (type === "user" && !user) {
   //    return <Navigate to="/user/login" replace />;
   // }
   // if (type === "partner" && !partner) {
   //    return <Navigate to="/food-partner/login" replace />;
   // }

   return <Outlet />;
};


export default ProtectedRoute;
