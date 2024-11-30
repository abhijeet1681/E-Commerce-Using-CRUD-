import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CartProvider } from "./context/CartContext";
import "./styles/global.css"; // Optional global styles

// Create the root element
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App wrapped in CartProvider
root.render(
  <CartProvider>
    <App />
  </CartProvider>
);

// Measure performance (optional)
reportWebVitals();
