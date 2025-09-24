import React from "react";

const Loader = () => {
   return (
      <div className="flex justify-center items-center h-40">
         <div className="w-10 h-10 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
      </div>
   );
};

export default Loader;
