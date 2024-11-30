import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Footer from "../components/Footer";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [extraProducts, setExtraProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    "https://flipshope.com/blog/wp-content/uploads/2023/10/Flipkart-big-billion-days-date.jpg",
    "https://cdn.flipshope.com/blog/wp-content/uploads/2023/12/Flipkart-New-year-sale.jpg",
    "https://i.pinimg.com/736x/6e/22/7a/6e227ab8b1c3ce20db00c1a813b7bf05.jpg",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response1 = await fetch("https://fakestoreapi.com/products");
        const data1 = await response1.json();

        const response2 = await fetch("https://dummyjson.com/products?limit=10");
        const data2 = await response2.json();

        setProducts(data1);
        setExtraProducts(data2.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredExtraProducts = extraProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <p>Loading products, please wait...</p>;
  }

  return (
    <div className="home">
      <div
        className="hero-banner"
        style={{ backgroundImage: `url(${heroImages[currentImageIndex]})` }}
      ></div>

      <div className="featured-products">
        <h2>{filteredProducts.length > 0 ? "Our Products" : "No Products Found"}</h2>
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.title} />
                <h3>{product.title}</h3>
                <p>₹{(product.price * 80).toFixed(2)}</p>
                <Link to={`/product-details/${product.id}`}>
                  <button>View Details</button>
                </Link>
              </div>
            ))
          ) : (
            <p>No products match your search.</p>
          )}
        </div>
      </div>

      <div className="extra-products">
        <h2>{filteredExtraProducts.length > 0 ? "More Products" : "No More Products Found"}</h2>
        <div className="product-grid">
          {filteredExtraProducts.length > 0 ? (
            filteredExtraProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.thumbnail} alt={product.title} />
                <h3>{product.title}</h3>
                <p>₹{(product.price * 80).toFixed(2)}</p>
                <Link to={`/product-details/${product.id}`}>
                  <button>View Details</button>
                </Link>
              </div>
            ))
          ) : (
            <p>No more products match your search.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
