import React from "react";
import "./Home.css";

const Home = () => (
  <div className="home">
    <h1>Welcome to Our Store</h1>
    <p>Check out our featured products:</p>
    <div className="featured-products">
      <div className="product-card">
        <img src="https://via.placeholder.com/200" alt="Featured Product 1" />
        <h3>Featured Product 1</h3>
        <p>$299</p>
        <button>Add to Cart</button>
      </div>
        <div className="product-card">
            <img src="https://via.placeholder.com/200" alt="Featured Product 2" />
            <h3>Featured Product 2</h3>
            <p>$399</p>
            <button>Add to Cart</button>
            </div>
      <div className="product-card">
        <img src="https://via.placeholder.com/200" alt="Featured Product 2" />
        <h3>Featured Product 2</h3>
        <p>$399</p>
        <button>Add to Cart</button>
      </div>
    </div>
  </div>
);

export default Home;
