import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import Footer from "../components/Footer"; // Import the Footer component

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    if (email && password) {
      // Store user information in localStorage
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);

      setSuccessMessage("Signup successful! You can now log in.");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Navigate to the login page after successful signup
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setError("All fields are required. Please fill them out.");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form className="signup-form" onSubmit={handleSignup}>
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
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
      </div>
      <Footer /> {/* Add the Footer here */}
    </div>
  );
};

export default Signup;
