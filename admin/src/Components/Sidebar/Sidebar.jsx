import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import add_product_icon from "../Assets/Product_Cart.svg";
import list_product_icon from "../Assets/Product_list_icon.svg";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation(); // Hook to get the current route
  const [menu, setMenu] = useState("");

  // Sync the menu state with the current path
  useEffect(() => {
    const path = location.pathname;
    if (path === "/addproduct") setMenu("addproduct");
    else if (path === "/listproduct") setMenu("listproduct");
    else if (path === "/orders") setMenu("orders");
    else setMenu("");
  }, [location]);

  return (
    <div className="sidebar">
      
      <Link to="/addproduct" style={{ textDecoration: "none" }}>
        <div
          className={`sidebar-item ${
            menu === "addproduct" ? "active-link" : ""
          }`}
        >
          <img src={add_product_icon} alt="Add Product Icon" />
          <p>Add Product</p>
        </div>
      </Link>
      <Link to="/listproduct" style={{ textDecoration: "none" }}>
        <div
          className={`sidebar-item ${
            menu === "listproduct" ? "active-link" : ""
          }`}
        >
          <img src={list_product_icon} alt="Product List Icon" />
          <p>Product List</p>
        </div>
      </Link>
      <Link to="/orders" style={{ textDecoration: "none" }}>
        <div
          className={`sidebar-item ${menu === "orders" ? "active-link" : ""}`}
        >
          <p>Orders</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
