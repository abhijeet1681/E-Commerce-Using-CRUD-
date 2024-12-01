import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Footer from "../components/Footer";
import "./ProductListing.css";

const ProductListing = () => {
  const [allProducts, setAllProducts] = useState([]); // Master product list
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
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        const data = await response.json();
        setExchangeRate(data.rates.INR);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setAllProducts(data); // Populate master product list
        setFilteredProducts(data); // Initialize filtered list
        const uniqueCategories = [
          "all",
          ...new Set(data.map((product) => product.category || "Others")),
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
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      // Show all products if search query is empty
      setFilteredProducts(allProducts);
    } else {
      // Filter products based on search query
      const filtered = allProducts.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category === "all") {
      // Reset to all products for "all" category
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="product-page">
      <div className="product-listing">
        <div className="filter-search-container">
          {/* Filter by Category */}
          <div className="filter-section">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="filter-select"
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Search Products */}
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
                          : "https://via.placeholder.com/150"
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
      <Footer />
    </div>
  );
};

export default ProductListing;
