import React from "react";

const Footer = () => {
   return (
      <footer className="bg-gray-900 text-gray-300 text-center py-4 mt-8">
         <p>© {new Date().getFullYear()} Zomato Clone. All rights reserved.</p>
      </footer>
   );
};

export default Footer;
