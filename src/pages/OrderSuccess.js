// src/pages/OrderSuccess.js
import React from "react";
import { Link } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  return (
    <div className="order-success">
      <div className="success-container">
        <h1>🎉 Order Placed Successfully! 🎉</h1>
        <p>Thank you for shopping with us. Your order will be delivered soon!</p>
        <Link to="/products" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
