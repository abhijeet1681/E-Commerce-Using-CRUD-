import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const [address,] = useState("");
  const [paymentMethod, ] = useState("COD");
  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleProceedToCheckout = () => {
    // if (!address) {
    if (address) {
      alert("Please provide your address before proceeding.");
      return;
    }
    navigate("/checkout", {
      state: { address, paymentMethod, cart, totalAmount },
    });
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((product) => (
            <div key={product.id} className="cart-item">
              <img src={product.image} alt={product.title} className="cart-item-image" />
              <div className="cart-item-details">
                <p>{product.title}</p>
                <p>${product.price}</p>
                <div className="quantity">
                  <button onClick={() => updateQuantity(product.id, product.quantity - 1)}>-</button>
                  <input
                    type="number"
                    value={product.quantity}
                    min="1"
                    onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
                  />
                  <button onClick={() => updateQuantity(product.id, product.quantity + 1)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(product.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-summary">
        
        {/* <div className="payment-method">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
            />
            Cash on Delivery
          </label>
        </div> */}

        <div className="total-amount">
          <p>Total: ${totalAmount.toFixed(2)}</p>
        </div>

        <button
          className="proceed-btn"
          onClick={handleProceedToCheckout} >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
