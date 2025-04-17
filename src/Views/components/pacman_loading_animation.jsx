import React from "react";
import "./PacmanLoader.css";

const PacmanLoader = () => {
  return (
    <div className="loader-wrapper">
      <div className="pacman"></div>
      <div className="dots">
        {[...Array(4)].map((_, i) => (
          <span key={i} style={{ animationDelay: `${i * 0.2}s` }}></span>
        ))}
      </div>
    </div>
  );
};

export default PacmanLoader;
