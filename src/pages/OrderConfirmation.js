import React from 'react';
import { useLocation } from 'react-router-dom';
import './OrderConfirmation.css'; // Optional CSS file for styling

const OrderConfirmation = () => {
  // Use React Router to access the state passed to this component
  const location = useLocation();
  const orderDetails = location.state ? location.state.orderDetails : null;

  if (!orderDetails) {
    return <p>Error: No order details available.</p>;
  }

  return (
    <div className="order-confirmation-page">
      <h1>Order Confirmation</h1>
      <p>Thank you for your purchase!</p>
      <h2>Order Summary</h2>
      <div className="order-summary">
        <ul>
          {orderDetails.products.map((product, index) => (
            <li key={index}>
              <strong>{product.title}</strong> (x{product.quantity}) - ₹{(product.price * product.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <p className="total-price">
          <strong>Total Amount: ₹{orderDetails.totalAmount.toFixed(2)}</strong>
        </p>
      </div>
      <p>Order ID: {orderDetails.orderId}</p>
      <p>Estimated Delivery: {orderDetails.estimatedDelivery}</p>
    </div>
  );
};

export default OrderConfirmation;
