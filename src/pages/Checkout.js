import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Checkout.css';

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "COD", // Default to Cash on Delivery
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your order has been placed successfully!");
    navigate("/order-success"); // Redirect to success page
    // alert("Order Placed Successfully!");
    // Handle order submission logic here
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="address"
          placeholder="Shipping Address"
          value={formData.address}
          onChange={handleInputChange}
          required
        ></textarea>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleInputChange}
        >
          <option value="COD">Cash on Delivery</option>
          {/* <option value="Credit Card">Credit Card</option> */}
        </select>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default Checkout;
