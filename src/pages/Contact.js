// src/pages/Contact.js
import React, { useState } from "react";
import "./Contact.css"; // Import custom styling

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can send form data to a backend API or handle form submission here
    console.log(formData); // Just logs the form data in the console for now
    setFormSubmitted(true); // Show confirmation message after submission
    setFormData({ name: "", email: "", message: "" }); // Reset form
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {formSubmitted && (
        <div className="confirmation-message">
          <p>Thank you for reaching out! We'll get back to you shortly.</p>
        </div>
      )}
    </div>
  );
};

export default Contact;
