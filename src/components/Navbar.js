import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaShoppingCart } from "react-icons/fa"; // Importing a cart icon from react-icons

const Navbar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPassword");
    
    // Update logged-in state and navigate to the login page
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
      {/* <div className="navbar-center">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for products..."
        />
      </div> */}
      <div className="navbar-right">
        <Link to="/login" className="nav-link">Log in</Link>
        <Link to="/signup" className="nav-link">Sign up</Link>
        <Link to="/cart" className="nav-link cart-link">
          <FaShoppingCart className="cart-icon" />
          Cart
        </Link>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
