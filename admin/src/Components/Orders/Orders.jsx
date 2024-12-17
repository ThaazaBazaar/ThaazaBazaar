import React, { useState, useEffect } from "react";
import "./Orders.css";
import { backend_url, currency } from "../../App";
const Orders = () => {
  // Mock data for orders
  const [orders, setOrders] = useState([
    // {
    //   id: "ORD123",
    //   payment: "Paid",
    //   items: [
    //     { name: "Apple", quantity: 2, price: 3 },
    //     { name: "Milk", quantity: 1, price: 1.5 },
    //   ],
    // },
    // {
    //   id: "ORD124",
    //   payment: "Pending",
    //   items: [
    //     { name: "Bread", quantity: 1, price: 2 },
    //     { name: "Banana", quantity: 6, price: 1.2 },
    //   ],
    // },
    // {
    //   id: "ORD125",
    //   payment: "Paid",
    //   items: [
    //     { name: "Eggs", quantity: 12, price: 4 },
    //     { name: "Cheese", quantity: 1, price: 5 },
    //   ],
    // },
  ]);

  const fetchInfo = async () => {
    try {
      const res = await fetch(`${backend_url}/api/orders`);
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };


  useEffect(() => {
    fetchInfo();
  }, []);

  // console.log(orders);

  // Function to toggle collapse for an order
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
  };

  return (
    <div className="orders-container">
      {orders
        .slice() // Clone the array
        .reverse() // Reverse to show newest orders on top
        .map((order) => (
          <div
            key={order._id}
            className={`order-card ${
              expandedOrderId === order._id ? "expanded" : ""
            }`}
          >
            <div
              className="order-header"
              onClick={() => toggleOrderDetails(order._id)}
            >
              <p>
                <strong>ORDER ID:</strong> {order._id}
              </p>

              {/* <strong>Payment:</strong> {order.payment} */}
              {order.isDelivered ? (
                <div className="paid">Delivered</div>
              ) : (
                <div className="pending">Not Delivered</div>
              )}
            </div>
            {expandedOrderId === order._id && (
              <div className="order-details">
                <ul>
                  <strong>Order Items : </strong>

                  {order.orderItems?.map((item, index) => (
                    <li key={index}>
                      {item.name} - {item.qty} x {currency}{item.price}
                    </li>
                  ))}
                </ul>
                <ul>
                  <strong>Total Amount : </strong> {order.totalPrice}
                </ul>
                <ul>
                  <strong>Payment Method : </strong> {order.paymentMethod}
                </ul>
                <ul>
                  <strong>User Details : </strong>
                  <li key={`${order._id}-name`}>
                    <strong>- Name :</strong>
                    {" " + order.user.name}
                  </li>
                  <li key={`${order._id}-email`}>
                    <strong>- Email :</strong>
                    {" " + order.user.email}
                  </li>
                </ul>
                <ul>
                  <strong>Shipping Address : </strong>
                  <li key={`${order._id}-address`}>
                    <strong>- Address :</strong>
                    {" " + order.shippingAddress.address}
                  </li>
                  <li key={`${order._id}-city`}>
                    <strong>- City :</strong>
                    {" " + order.shippingAddress.city}
                  </li>
                  <li key={`${order._id}-postalCode`}>
                    <strong>- Postal Code :</strong>
                    {" " + order.shippingAddress.postalCode}
                  </li>
                </ul>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default Orders;
