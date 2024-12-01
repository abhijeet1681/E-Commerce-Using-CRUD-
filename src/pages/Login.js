import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Footer from "../components/Footer"; // Import the Footer component

const Login = ({ setIsLoggedIn, setUsername }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const userName = "John Doe";
    const userEmail = "johndoe@example.com";

    localStorage.setItem("userName", userName);
    localStorage.setItem("userEmail", userEmail);

    setIsLoggedIn(true);
    navigate("/");
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    // Check if the provided email and password match the stored data
    if (email === storedEmail && password === storedPassword) {
      setIsLoggedIn(true);
      setUsername(email); // Store the username (email) for display purposes
      navigate("/dashboard"); // Navigate to a protected route
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
