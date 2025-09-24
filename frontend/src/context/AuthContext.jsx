import React, { createContext, useState, useEffect } from "react";

// Context create
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null);     // normal user
   const [partner, setPartner] = useState(null); // food partner
   const [loading, setLoading] = useState(true);

   // On app start check localStorage
   useEffect(() => {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      const savedPartner = JSON.parse(localStorage.getItem("partner"));

      if (savedUser) setUser(savedUser);
      if (savedPartner) setPartner(savedPartner);

      setLoading(false);
   }, []);

   // Login function (for both user & partner)
   const login = (data, type) => {
      if (type === "user") {
         setUser(data);
         localStorage.setItem("user", JSON.stringify(data));
         localStorage.setItem("token", data.token);
      } else if (type === "partner") {
         setPartner(data);
         localStorage.setItem("partner", JSON.stringify(data));
         localStorage.setItem("token", data.token);
      }
   };


   // Logout function
   const logout = () => {
      setUser(null);
      setPartner(null);
      localStorage.removeItem("user");
      localStorage.removeItem("partner");
   };

   return (
      <AuthContext.Provider value={{ user, partner, login, logout, loading }}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthProvider;
