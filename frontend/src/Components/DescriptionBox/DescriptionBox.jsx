import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = ({ product }) => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Product Description</div>
      </div>
      <div className="descriptionbox-description">
        {product?.description ? (
          <p>{product.description}</p>
        ) : (
          <p>No description available for this product.</p>
        )}
      </div>
    </div>
  );
};

export default DescriptionBox;
