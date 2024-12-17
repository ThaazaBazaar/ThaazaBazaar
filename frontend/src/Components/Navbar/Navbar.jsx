import React, { useContext, useRef, useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../Assets/logo_letter.png";
import cart_icon from "../Assets/cart_icon.png";
import nav_dropdown from "../Assets/nav_dropdown.png";
// import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();
  const location = useLocation(); // Hook to get the current route
  const navigate = useNavigate();
  const dropdownRef = useRef(); // Reference for dropdown
  const [showDropdown, setShowDropdown] = useState(false);

  // Retrieve login status
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));
  // Sync the menu state with the current path
  useEffect(() => {
    const path = location.pathname;
    if (path === "/") setMenu("shop");
    else if (path === "/groceries") setMenu("groceries");
    else if (path === "/fruits") setMenu("fruits");
    else if (path === "/vegetables") setMenu("vegetables");
    else setMenu("");
  }, [location]);

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  // Close dropdown when clicking outside
  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(true);
    setShowDropdown(false); // Close dropdown
    navigate("/signup");
  };

  return (
    <div className="navbar">
      <Link
        to="/"
        onClick={() => {
          setMenu("shop");
        }}
        className="nav-logo"
      >
        <img src={logo} alt="" />
        {/* <p>Thaza bazaar</p> */}
      </Link>
      <img
        onClick={dropdown_toggle}
        className="nav-dropdown"
        src={nav_dropdown}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link to="/">Shop</Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("groceries");
          }}
        >
          <Link to="/groceries">Groceries</Link>
          {menu === "groceries" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("fruits");
          }}
        >
          <Link to="fruits">Fruits</Link>
          {menu === "fruits" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("vegetables");
          }}
        >
          <Link to="/vegetables">Vegetables</Link>
          {menu === "vegetables" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {isLoggedIn ? (
          <Link to="/signup">
            <button>SignUp</button>
          </Link>
        ) : (
          <div className="profile-dropdown" ref={dropdownRef}>
              <button onClick={toggleDropdown }>
              Profile ▼
            </button>
            {showDropdown && (
              <ul className="dropdown-menu">
                  <li onClick={() => { setShowDropdown(false); navigate("/profile"); }}>Profile</li>
                  <li onClick={() => { setShowDropdown(false); navigate("/orders"); }}>Orders</li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            )}
          </div>
        )}
        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
