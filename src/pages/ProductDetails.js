import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
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

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    alert(`${product.title} added to cart!`);
    // Here you can integrate cart functionality
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

  return (
    <div className="product-details">
      <div className="product-details-container">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-category">Category: {product.category}</p>
          <p className="product-description">{product.description}</p>
          <p className="product-price">Rs.{product.price.toFixed(2)}</p>
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
