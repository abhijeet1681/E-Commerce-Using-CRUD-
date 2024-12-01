import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  // Retrieve user's name from localStorage
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    // Clear user details from localStorage
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">E-Commerce</Link>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/products" className="nav-link">Products</Link>
      </div>
      <div className="navbar-right">
        {userName ? (
          <>
            <span className="welcome-message">Welcome, {userName}!</span>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Log in</Link>
            <Link to="/signup" className="nav-link">Sign up</Link>
          </>
        )}
        <Link to="/cart" className="nav-link cart-link">
          <FaShoppingCart className="cart-icon" />
          Cart
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
