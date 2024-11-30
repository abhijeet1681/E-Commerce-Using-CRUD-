import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [extraProducts, setExtraProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from multiple APIs
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch from the first API
        const response1 = await fetch("https://fakestoreapi.com/products");
        const data1 = await response1.json();

        // Fetch from the second API
        const response2 = await fetch("https://dummyjson.com/products?limit=10");
        const data2 = await response2.json();

        setProducts(data1); // Set main products
        setExtraProducts(data2.products); // Set additional products
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="home">
      {/* Advertisement Section */}
      <div className="advertisement">
        <img
          src="https://scontent.fbom17-1.fna.fbcdn.net/v/t39.30808-6/252289542_1061020348058847_4410264622551310398_n.png?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=OZjOnlMYOsUQ7kNvgEz314O&_nc_zt=23&_nc_ht=scontent.fbom17-1.fna&_nc_gid=A_hN7E5VXDetkjwyLNhURCk&oh=00_AYCMLmAOfkzzapflPbeG5nMGcaIe67UoobCdaBNfxMu-GQ&oe=6750F4EB"
          alt="Advertisement"
          className="advertisement-image"
        />
        <div className="advertisement-text">
          <h2>Big Sale on Top Brands!</h2>
          <p>Don't miss out on amazing deals. Shop now and save big!</p>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="featured-products">
        <h2>Our Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>₹{(product.price * 80).toFixed(2)}</p> {/* Assuming 1 USD = 80 INR */}
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>

      {/* Extra Products Section */}
      <div className="extra-products">
        <h2>More Products</h2>
        <div className="product-grid">
          {extraProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
              <p>₹{(product.price * 80).toFixed(2)}</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="contact-us">
          <h3>Contact Us</h3>
          <p>Email: support@store.com</p>
          <p>Phone: +91 12345 67890</p>
          <p>Address: 123, Shopping Lane, Cityville, India</p>
        </div>
        <div className="about-us">
          <h3>About Us</h3>
          <p>
            Welcome to our store! We are committed to bringing you the best
            products at unbeatable prices. Explore our wide range of categories
            and enjoy a seamless shopping experience.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
