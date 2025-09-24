// src/pages/general/Orders.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/orders.css";

const OrdersPage = () => {
   const [orders, setOrders] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");

   useEffect(() => {
      const fetchOrders = async () => {
         try {
            setLoading(true);
            const response = await axios.get("http://localhost:4000/api/user/orders", {
               withCredentials: true,
            });

            if (response.data && Array.isArray(response.data.orders)) {
               setOrders(response.data.orders);
            } else {
               setError("No orders found.");
            }
         } catch (err) {
            console.error(err);
            setError("Failed to load orders.");
         } finally {
            setLoading(false);
         }
      };

      fetchOrders();
   }, []);

   if (loading) return <div className="loading">Loading orders...</div>;
   if (error) return <div className="error">{error}</div>;

   return (
      <main className="orders-page">
         <h1 className="orders-title">My Orders</h1>

         {orders.length === 0 ? (
            <p className="no-orders">You have not placed any orders yet.</p>
         ) : (
            <div className="orders-list">
               {orders.map((order, i) => (
                  <div key={i} className="order-card">
                     <h3 className="order-id">Order #{order._id}</h3>
                     <p className="order-date">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                     <p className="order-status">Status: {order.status}</p>

                     <div className="order-items">
                        {order.items.map((item, idx) => (
                           <div key={idx} className="order-item">
                              <p className="item-name">{item.name}</p>
                              <p className="item-quantity">Quantity: {item.quantity}</p>
                              <p className="item-price">Price: ₹{item.price}</p>
                           </div>
                        ))}
                     </div>

                     <p className="order-total">Total: ₹{order.total}</p>
                  </div>
               ))}
            </div>
         )}
      </main>
   );
};

export default OrdersPage;
