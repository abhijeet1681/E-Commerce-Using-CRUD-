import React, { createContext, useState } from "react";

// Create context
export const CartContext = createContext();

// CartProvider component that holds the cart state
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter(product => product.id !== productId));
  };

  // Update product quantity
  const updateQuantity = (productId, quantity) => {
    setCart(cart.map(product =>
      product.id === productId ? { ...product, quantity: quantity } : product
    ));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
