import React from "react";

const OrderItem = ({ order }) => {
   return (
      <div className="bg-white shadow-md rounded-md p-4 flex justify-between items-center">
         <div>
            <h3 className="font-bold">{order.foodName}</h3>
            <p className="text-gray-600">Quantity: {order.quantity}</p>
            <p className="text-gray-600">Price: ₹{order.totalPrice}</p>
         </div>
         <span
            className={`px-3 py-1 rounded text-sm ${order.status === "delivered"
                  ? "bg-green-200 text-green-700"
                  : "bg-yellow-200 text-yellow-700"
               }`}
         >
            {order.status}
         </span>
      </div>
   );
};

export default OrderItem;
