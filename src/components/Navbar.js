import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";

const Navbar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const { cart } = useContext(CartContext); // Get cart data from context

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">E-Commerce</Link>
      </div>

      <div className="navbar-center">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/products" className="nav-link">Products</Link>
        <Link to="/aboutus" className="nav-link">About Us</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </div>

      <div className="navbar-right">
        {userName ? (
          <>
            <span className="welcome-message">Welcome, {userName}!</span>
            <Link to="/cart" className="cart-link">
              <FaShoppingCart className="cart-icon" />
              <span className="cart-count">{cart.length}</span>
            </Link>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Log in</Link>
            <Link to="/signup" className="nav-link">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
