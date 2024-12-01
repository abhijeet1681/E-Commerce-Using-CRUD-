import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";  
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import { SearchProvider } from './context/SearchContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [username, setUsername] = useState("");
  const [ setUsername] = useState("");

  return (
    <SearchProvider>
      <Router>
        {/* <Navbar username={username} /> */}
        <Navbar setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
          <Route path="/signup" element={<Signup setIsLoggedIn={isLoggedIn}  setUsername={setUsername} />} />
          <Route path="/product-details/:productId" element={<ProductDetails />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </SearchProvider>
  );
}

export default App;
