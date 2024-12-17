import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { backend_url } from "../../App";

const ProductDisplay = () => {
  // const { prod } = props;
  const { addToCart } = useContext(ShopContext);

  const [selected, setSelected] = useState("1 Kg");
  const options = ["0.25 Kg", "0.5 Kg", "1 Kg", "2 Kg"];

  const [ripeselected, setRipeselected] = useState("Full Ripe");
  const ripeOptions = ["Raw", "Medium", "Full Ripe"];
  const handleChange = (value) => {
    setSelected(value);
  };
  const handleRipeChange = (value) => {
    setRipeselected(value);
  };

  const { productId } = useParams(); // Get productId from the route
  const [product, setProduct] = useState(null); // State for product details
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Fetch product details from the backend
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `${backend_url}/api/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        console.log(data);
        console.log(product);
        setProduct(data); // Set product details
        console.log(product);
      } catch (err) {
        setError(err.message); // Handle any error that occurs
      } finally {
        setLoading(false); // Set loading to false once the request completes
      }
    };

    fetchProductDetails();
  }, [productId]); // Re-run this effect when productId changes

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!product) {
    return <div className="no-product">Product not found!</div>;
  }

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
                {/* <div>Raw</div>
            <div>Medium</div>
            <div>Full Ripe</div> */}
                {ripeOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`size-option ${
                      ripeselected === option ? "selected" : ""
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
