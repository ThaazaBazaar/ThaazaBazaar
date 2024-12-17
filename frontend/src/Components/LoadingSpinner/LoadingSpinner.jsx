import React from "react";
import "./LoadingSpinner.css";
const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
