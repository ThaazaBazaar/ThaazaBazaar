import React, { useContext, useState } from "react";
// import { useParams } from "react-router-dom";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
// import { backend_url } from "../../App";

const ProductDisplay = ({product}) => {
  // const { prod } = props;
  const { addToCart } = useContext(ShopContext);

  const [selected, setSelected] = useState("1 Kg");
  const options = ["0.25 Kg", "0.5 Kg", "1 Kg", "2 Kg"];

  const [ripeSelected, setRipeSelected] = useState("Full Ripe");
  const ripeOptions = ["Raw", "Medium", "Full Ripe"];
  const handleChange = (value) => {
    setSelected(value);
  };
  const handleRipeChange = (value) => {
    setRipeSelected(value);
  };

  return (
    // console.log (product)
    <div className="productdisplay">
      <div className="productdisplay-left">
        {/* <div className="productdisplay-img-list"> */}
        {/* <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" /> */}
        {/* </div> */}

        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ₹ {product.old_price}
            {product.category !== "Groceries" && "/kg"}
          </div>
          <div className="productdisplay-right-price-new">
            ₹ {product.new_price}
            {product.category !== "Groceries" && "/kg"}
          </div>
        </div>
        {product.category === "Fruits" && (
          <>
            <div className="productdisplay-right-description">
              Select an option on how ripe You need this fruit.
              <div className="productdisplay-right-description-ripe">
                Example : Raw, medium, Full Ripe
              </div>
            </div>
            <div className="productdisplay-right-size">
              <h1>Select Ripe Category</h1>
              <div className="productdisplay-right-sizes">
                
                {ripeOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`size-option ${
                      ripeSelected === option ? "selected" : ""
                    }`}
                    onClick={() => handleRipeChange(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {product.category !== "Groceries" && (
          <>
            <div className="productdisplay-right-size">
              <h1>Select KG</h1>
              <div className="productdisplay-right-sizes">
                {/* <div>0.25</div>
            <div>0.5</div>
            <div>1</div>
            <div>2</div> */}
                {options.map((option, index) => (
                  <div
                    key={index}
                    className={`size-option ${
                      selected === option ? "selected" : ""
                    }`}
                    onClick={() => handleChange(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <button
          onClick={() => {
            addToCart(product.id);
          }}
        >
          ADD TO CART
        </button>
        {/* <p className="productdisplay-right-category">
          <span>Category :</span>Women , T-Shirt, Crop Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags :</span>Modern, Latest
        </p> */}
      </div>
    </div>
  );
};

export default ProductDisplay;
