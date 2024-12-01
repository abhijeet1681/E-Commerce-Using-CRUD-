import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaShoppingCart } from "react-icons/fa"; // Importing cart icon from react-icons

const Navbar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  // Retrieve user's name from localStorage
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    // Remove user information from localStorage
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPassword");
    localStorage.removeItem("isLoggedIn");

    // Update app state and navigate to login
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Left Section: Logo */}
      <div className="navbar-left">
        <Link to="/" className="logo">E-Commerce</Link>
      </div>

      {/* Center Section: Navigation Links */}
      <div className="navbar-center">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/products" className="nav-link">Products</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </div>

      {/* Right Section: User Options */}
      <div className="navbar-right">
        {userName ? (
          <>
            <span className="welcome-message">Welcome, {userName}!</span>
            <Link to="/cart" className="nav-link cart-link">
              <FaShoppingCart className="cart-icon" />
              Cart
            </Link>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Log in</Link>
            <Link to="/signup" className="nav-link">Sign up</Link>
            <Link to="/cart" className="nav-link cart-link">
              <FaShoppingCart className="cart-icon" />
              Cart
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
