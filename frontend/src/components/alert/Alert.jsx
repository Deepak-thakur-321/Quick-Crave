import React from "react";

const Alert = ({ type, message }) => {
   return (
      <div
         className={`p-3 rounded-md mb-4 text-sm ${type === "success"
               ? "bg-green-200 text-green-700"
               : "bg-red-200 text-red-700"
            }`}
      >
         {message}
      </div>
   );
};

export default Alert;
