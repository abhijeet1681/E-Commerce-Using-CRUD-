import React from "react";
import "./About.css"; // Import custom styles for the About page
import Footer from "../components/Footer"; // Import the Footer component

const About = () => {
  return (
    <div>
    <div className="about">
      {/* Hero Section */}
      <div className="about-hero">
        <h1>About Us</h1>
        <p>Committed to delivering the best products and service.</p>
      </div>

      {/* Mission Section */}
      <div className="about-mission">
        <h2>Our Mission</h2>
        <p>
          At Abhijeet Technologies Pvt. Ltd, our mission is to provide top-notch products that meet our customers' needs and exceed their expectations. We are passionate about quality, customer satisfaction, and innovation.
        </p>
      </div>

      {/* Team Section */}
      <div className="about-team">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="https://www.quotagebiography.com/wp-content/uploads/2024/08/Ratan-Tata.jpg" alt="Ratan Tata" />
            <h3>Ratan Tata</h3>
            <p>CEO & Founder</p>
            <p>Ratan Tata is the driving force behind our company's vision and strategy.</p>
          </div>
          <div className="team-member">
            <img src="https://media.licdn.com/dms/image/v2/D5603AQGJdDe1e4VZEQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1683207134549?e=2147483647&v=beta&t=d4w2SP0vn0XXZj9xMIrNaUSJjTyxeiaOHKXoQAq5XLM" alt="Abhijeet Jadhav" />
            <h3>Abhijeet Jadhav</h3>
            <p>Head of Operations</p>
            <p>Abhijeet ensures that our operations run smoothly and efficiently.</p>
          </div>
          <div className="team-member">
            <img src="https://imgcdn.stablediffusionweb.com/2024/8/27/4534caf9-045b-49aa-bf47-e0227f1bd3c8.jpg" alt="Elon Musk" />
            <h3>Elon Musk</h3>
            <p>Marketing Director</p>
            <p>Elon Musk leads our marketing campaigns and brand strategies.</p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="about-contact">
        <h2>Contact Us</h2>
        <p>Email: jabhijee9274@gmail.com</p>
        <p>Phone: +91 1234567890</p>
        <p>Address: 123 Manali Nagar, Mumbai, India</p>
      </div>
      </div>
      
      <Footer /> {/* Add Footer component here */}
    </div>
  );
};

export default About;
