import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext"; // Import CartContext
import "./ProductDetails.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exchangeRate, setExchangeRate] = useState(1); // Default to 1 in case API fails
  const [showPopup, setShowPopup] = useState(false); // Popup state
  const { addToCart } = useContext(CartContext); // Cart context
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

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

    fetchProduct();
    fetchExchangeRate();
  }, [productId]);

  const handleAddToCart = () => {
    addToCart(product); // Add product to cart
    setShowPopup(true); // Show popup
    setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
  };

  if (loading) {
    return <div className="product-details-loading">Loading product details...</div>;
  }

  if (!product) {
    return (
      <div className="product-details-error">
        <h1>Product Not Found</h1>
        <button onClick={() => navigate("/products")} className="back-to-products">
          Back to Products
        </button>
      </div>
    );
  }

  const priceInRupees = (product.price * exchangeRate).toFixed(2);

  return (
    <div className="product-details">
      {showPopup && <div className="popup">Added to Cart!</div>} {/* Popup */}
      <div className="product-details-container">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-category">Category: {product.category}</p>
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: ₹{priceInRupees}</p>
          <button onClick={handleAddToCart} className="add-to-cart-button">
            Add to Cart
          </button>
          <button onClick={() => navigate("/products")} className="back-to-products">
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
