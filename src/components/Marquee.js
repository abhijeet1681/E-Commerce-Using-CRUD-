import React from "react";
import "./Marquee.css"; // Import the CSS file for styles

const Marquee = () => {
  return (
    <div className="main">
      <div className="marq" style={{ backgroundColor: "green" }}>
        <div className="geek1">GeeksforGeeks</div>
        <div className="geek2">A computer science portal for geeks</div>
      </div>
    </div>
  );
};

export default Marquee;
