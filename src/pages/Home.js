import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Footer from "../components/Footer";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const [reviews] = useState([
    { id: 1, user: "Virat Kohli", text: "Great products, fast delivery!", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqiLcH85KsPIY_7fCa_-amaizI1wLLhx076Q&s" },
    { id: 2, user: "Rohit Sharma", text: "Amazing quality and service.", image: "https://media.sportstiger.com/players/RohitSharma22-06-2021-05-10-26.png" },
    { id: 3, user: "Sachin Tendulkar", text: "User-friendly website and great deals.", image: "https://www.looktothestars.org/photo/5984-sachin-tendulkar/teaser-1503129140.jpg" }
  ]);

  const heroImages = [
    "https://rukminim1.flixcart.com/flap/1800/1800/image/ddbe8a22de89bf94.jpg",
    "https://images.freekaamaal.com/post_images/1637727957.PNG",
    "https://www.dawncrackers.com/crackers/1-online-fireworks.jpg",
    "https://amoghatrading.com/images/amogha4.jpg",
    "https://scontent.fbom22-1.fna.fbcdn.net/v/t39.30808-6/245311454_10159824857688559_3452217121803482403_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=9vFQZ8X3so0Q7kNvgFC0w4D&_nc_zt=23&_nc_ht=scontent.fbom22-1.fna&_nc_gid=AV8DKTc2knC2LKiocQonCft&oh=00_AYCy-z0c3fTfDfSqf8tkocCxmtNOW9IxXGCzthogxYvC2A&oe=67521758",
    "https://flipshope.com/blog/wp-content/uploads/2023/10/Flipkart-big-billion-days-date.jpg",
  ];

  const categories = [
    { id: 1, name: "Electronics", image: "https://img.paisawapas.com/ovz3vew9pw/2024/11/22110833/flipkart-wishlist-PaisaWapas-Deal.jpg" },
    { id: 2, name: "Fashion", image: "https://i.ytimg.com/vi/HBXANI35Xlg/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLA752g6UpcYkH5us8AG-3nnqGG6pw" },
    { id: 3, name: "Home Appliances", image: "https://assets.indiadesire.com/images/Flipkart%20Grand%20Home%20Appliances%20Sale%20may%202024.jpg" },
    { id: 4, name: "Books", image: "https://rukminim2.flixcart.com/image/750/900/xif0q/diary-notebook/o/a/h/classmate-square-line-exercise-book-abc-season-store-original-imagshwzyxvxfyq7.jpeg?q=20&crop=false" },
  ];

  // Sample data for promotions
  const promotions = [
    { id: 1, title: "Winter Sale", details: "Up to 50% off on select items!", image: "https://static.vecteezy.com/system/resources/previews/012/990/072/non_2x/winter-sale-poster-free-vector.jpg" },
    { id: 2, title: "New Arrivals", details: "Check out the latest products in our collection.", image: "https://img.freepik.com/premium-vector/new-arrival-banner-template-classic-blue-color_1361-2098.jpg?w=1380" },
    { id: 3, title: "Flash Sale", details: "Limited time offer on trending products.", image: "https://www.shutterstock.com/image-vector/66-mid-year-sale-banner-260nw-2299992751.jpg" }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data.slice(0, 10)); // Display only the first 10 products
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

  if (loading) {
    return <p>Loading products, please wait...</p>;
  }

  return (
    <div className="home">
      {/* Hero Banner */}
      <div className="hero-banner" style={{ backgroundImage: `url(${heroImages[currentImageIndex]})` }}></div>

      {/* Categories Section */}
      <div className="categories-section">
        <h2>Shop by Categories</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
              <Link to={`/products?category=${category.name}`}>
                <button>Shop Now</button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="featured-products">
        <h2>Our Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>₹{(product.price * 80).toFixed(2)}</p>
              <Link to={`/product-details/${product.id}`}>
                <button>View Details</button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* New Arrivals */}
      <div className="new-arrivals">
        <h2>New Arrivals</h2>
        <div className="new-arrivals-grid">
          {products.slice(0, 4).map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>₹{(product.price * 80).toFixed(2)}</p>
              <Link to={`/product-details/${product.id}`}>
                <button>View Details</button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Promotions Section */}
      <div className="promotions">
        <h2>Current Promotions</h2>
        <div className="promotions-grid">
          {promotions.map((promo) => (
            <div key={promo.id} className="promotion-card">
              <img className="promotion-image" src={promo.image} alt={promo.title} />
              <h3>{promo.title}</h3>
              <p>{promo.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* User Reviews */}
      <div className="user-reviews">
        <h2>What Our Customers Are Saying</h2>
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <img className="reviewer-image" src={review.image} alt={review.user} />
              <div className="review-text">
                <p><strong>{review.user}:</strong> {review.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
