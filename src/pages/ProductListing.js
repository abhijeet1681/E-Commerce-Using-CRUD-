import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext"; // Import CartContext
import "./ProductListing.css"; // Your CSS file for styling

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false); // State to control the pop-up visibility
  const [popupMessage, setPopupMessage] = useState(""); // Message for the pop-up
  
  // Access the CartContext
  const { addToCart } = useContext(CartContext);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle adding product to cart using the CartContext function
  const handleAddToCart = (product) => {
    addToCart(product); // This adds the product to the cart state managed by CartContext
    setPopupMessage(`${product.title} added to cart!`); // Set the pop-up message
    setShowPopup(true); // Show the pop-up
    setTimeout(() => {
      setShowPopup(false); // Hide the pop-up after 3 seconds
    }, 3000);
  };

  return (
    <div className="product-listing">
      <h1>All Products</h1>

      {/* Success pop-up message */}
      {showPopup && (
        <div className="popup">
          <p>{popupMessage}</p>
        </div>
      )}

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/products/${product.id}`}>
                <img src={product.image} alt={product.title} />
                <h2>{product.title}</h2>
              </Link>
              <p>Rs.{product.price}</p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListing;
