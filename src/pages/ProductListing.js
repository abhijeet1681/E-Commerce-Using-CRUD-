import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Footer from "../components/Footer";
import "./ProductListing.css"; // Your CSS file for styling

const ProductListing = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [exchangeRate, setExchangeRate] = useState(1); // For USD to INR conversion
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { addToCart } = useContext(CartContext);

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

    const fetchProducts = async () => {
      try {
        const responses = await Promise.all([
          fetch("https://fakestoreapi.com/products"),
          fetch("https://dummyjson.com/products"),
        ]);
        const data = await Promise.all(responses.map((res) => res.json()));
        const allProducts = [
          ...data[0], // Products from fakestoreapi
          ...data[1].products, // Products from dummyjson
        ];

        // Set filteredProducts to all products initially
        setFilteredProducts(allProducts);

        // Extract unique categories
        const uniqueCategories = [
          "all",
          ...new Set(allProducts.map((product) => product.category || "Others")),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRate();
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setPopupMessage(`${product.title} added to cart!`);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Effect to filter products based on the search query and selected category
  useEffect(() => {
    const filterProducts = () => {
      let filtered = filteredProducts;
      if (selectedCategory !== "all") {
        filtered = filtered.filter((product) => product.category === selectedCategory);
      }
      if (searchQuery) {
        filtered = filtered.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [selectedCategory, searchQuery, filteredProducts]);

  return (
    <div className="product-page">
      <div className="product-listing">
        <div className="filter-search-container">
          <div className="filter-section">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="search-section">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
        </div>

        {showPopup && (
          <div className="popup">
            <p>{popupMessage}</p>
          </div>
        )}

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <Link to={`/products/${product.id}`}> 
                    <img
                      src={
                        product.image &&
                        (product.image.startsWith("http") || product.image.startsWith("https"))
                          ? product.image
                          : "https://via.placeholder.com/150" // Fallback placeholder image
                      }
                      alt={product.title}
                      className="product-image"
                    />
                  </Link>
                  <div className="product-info">
                    <h2 className="product-title">{product.title}</h2>
                    <p className="product-price">
                      ₹{(product.price * exchangeRate).toFixed(2)}
                    </p>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                </div>
              ))
            ) : (
              <p>No products match the selected filters.</p>
            )}
          </div>
        )}
      </div>
      <Footer /> {/* Add Footer component here */}
    </div>
  );
};

export default ProductListing;
