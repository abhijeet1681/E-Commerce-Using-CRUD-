import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const [address, setAddress] = useState(""); // Address input
  const [paymentMethod] = useState("COD"); // Default payment method
  const [exchangeRate, setExchangeRate] = useState(1); // For INR conversion
  const navigate = useNavigate();

  // Fetch exchange rate (USD to INR)
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        const data = await response.json();
        setExchangeRate(data.rates.INR);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    fetchExchangeRate();
  }, []);

  // Calculate total amount in INR
  const totalAmount = cart.reduce(
    (total, product) =>
      total + product.price * product.quantity * exchangeRate,
    0
  );

  // Handle checkout navigation
  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add products to proceed.");
      return;
    }
    if (!address.trim()) {
      alert("Please provide your suggestions before proceeding.");
      return;
    }
    navigate("/checkout", {
      state: { address, paymentMethod, cart, totalAmount },
    });
  };

  // Handle decrementing quantity
  const handleDecrement = (product) => {
    if (product.quantity > 1) {
      updateQuantity(product.id, product.quantity - 1);
    } else {
      removeFromCart(product.id); // Remove if quantity is 0
    }
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <div className="empty-cart-message">
          <p>Your cart is empty. Please add products to proceed.</p>
        </div>
      ) : (
        <div className="cart-items">
          {cart.map((product) => (
            <div key={product.id} className="cart-item">
              <img
                src={product.image}
                alt={product.title}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <p>{product.title}</p>
                <p>Price: ₹{(product.price * exchangeRate).toFixed(2)}</p>
                <div className="quantity">
                  <button onClick={() => handleDecrement(product)}>-</button>
                  <input
                    type="number"
                    value={product.quantity}
                    min="1"
                    onChange={(e) =>
                      updateQuantity(product.id, Math.max(1, parseInt(e.target.value) || 1))
                    }
                  />
                  <button
                    onClick={() =>
                      updateQuantity(product.id, product.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <p>
                  Subtotal: ₹
                  {(product.price * product.quantity * exchangeRate).toFixed(2)}
                </p>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-summary">
        {cart.length > 0 && (
          <>
            <div className="address-input">
              <label htmlFor="address">Suggestions:</label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your suggestions here (e.g., I need a red shirt)."
              ></textarea>
            </div>

            <div className="total-amount">
              <h2>Total: ₹{totalAmount.toFixed(2)}</h2>
            </div>

            <button className="proceed-btn" onClick={handleProceedToCheckout}>
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
