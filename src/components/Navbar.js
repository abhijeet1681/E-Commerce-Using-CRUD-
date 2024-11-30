import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => (
  <nav>
    <div>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
    </div>
    <div className="cart-icon">
      <Link to="/cart">Cart</Link>
      <span>2</span> {/* Dynamic cart count */}
    </div>
  </nav>
);

export default Navbar;
