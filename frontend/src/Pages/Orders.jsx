import React, { useEffect, useState } from "react";
import "./CSS/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/user/orders", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setOrders(data.orders);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (
    <div className="orders-container">
      <h1>Your Orders</h1>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <strong>Order ID:</strong> {order.id} <br />
              <strong>Date:</strong> {order.date} <br />
              <strong>Total:</strong> ${order.total.toFixed(2)} <br />
              <strong>Status:</strong> {order.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
