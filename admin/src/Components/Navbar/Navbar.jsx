import React, {  useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../Assets/logo_letter.png";
// import nav_dropdown from "../Assets/nav_dropdown.png";
// import { Link } from "react-router-dom";
// import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  // const [menu, setMenu] = useState("shop");
  // const { getTotalCartItems } = useContext(ShopContext);
  // const menuRef = useRef();
  // const location = useLocation(); // Hook to get the current route
  const navigate = useNavigate();
  const dropdownRef = useRef(); // Reference for dropdown
  const [showDropdown, setShowDropdown] = useState(false);

  // Retrieve login status
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));
  
 

 
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
          // setMenu("shop");
        }}
        className="nav-logo"
      >
        <img src={logo} alt="" />
        {/* <p>Admin</p> */}
        <h4>Admin</h4>
      </Link>
        {/* <img
          onClick={dropdown_toggle}
          className="nav-dropdown"
          src={nav_dropdown}
          alt=""
        /> */}
      
      <div className="nav-login-cart">
        {isLoggedIn ? (
          <Link to="/signup">
            <button>SignUp</button>
          </Link>
        ) : (
          <div className="profile-dropdown" ref={dropdownRef}>
            <button onClick={toggleDropdown}>Profile ▼</button>
            {showDropdown && (
              <ul className="dropdown-menu">
                <li
                  onClick={() => {
                    setShowDropdown(false);
                    navigate("/profile");
                  }}
                >
                  Profile
                </li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            )}
          </div>
        )}
       
      </div>
    </div>
  );
};

export default Navbar;
