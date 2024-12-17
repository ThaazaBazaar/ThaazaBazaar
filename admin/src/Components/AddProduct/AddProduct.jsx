import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../Assets/upload_area.svg";
import { backend_url } from "../../App";

const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    category: "Fruits",
    new_price: "",
    old_price: "",
    stock_status: "InStock",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Validate form fields
  const validateFields = () => {
    const newErrors = {};
    if (!productDetails.name.trim())
      newErrors.name = "Product title is required.";
    if (!productDetails.description.trim())
      newErrors.description = "Product description is required.";
    if (!productDetails.old_price.trim())
      newErrors.old_price = "Price is required.";
    else if (!/^\d+$/.test(productDetails.old_price))
      newErrors.old_price = "Price must be a number.";
    if (!productDetails.new_price.trim())
      newErrors.new_price = "Offer price is required.";
    else if (!/^\d+$/.test(productDetails.new_price))
      newErrors.new_price = "Offer price must be a number.";
    if (!image) newErrors.image = "Product image is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input field changes
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error for this field
  };

  // Function to handle product addition
  const handleAddProduct = async () => {
    if (!validateFields()) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("name", productDetails.name);
    formData.append("description", productDetails.description);
    formData.append("category", productDetails.category);
    formData.append("new_price", productDetails.new_price);
    formData.append("old_price", productDetails.old_price);
    formData.append("stock_status", productDetails.stock_status);
    formData.append("image", image);

    try {
      const response = await fetch(`${backend_url}/api/products`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Product Added Successfully");
        setProductDetails({
          name: "",
          description: "",
          category: "Fruits",
          new_price: "",
          old_price: "",
          stock_status: "InStock",
        });
        setImage(null);
      } else {
        alert(result.message || "Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="addproduct">
      {/* Product Title */}
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          type="text"
          name="name"
          value={productDetails.name}
          onChange={changeHandler}
          placeholder="Type here"
        />
        {errors.name && <p className="error-message">{errors.name}</p>}
      </div>

      {/* Product Description */}
      <div className="addproduct-itemfield">
        <p>Product description</p>
        <input
          type="text"
          name="description"
          value={productDetails.description}
          onChange={changeHandler}
          placeholder="Type here"
        />
        {errors.description && (
          <p className="error-message">{errors.description}</p>
        )}
      </div>

      {/* Pricing */}
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            type="text"
            name="old_price"
            value={productDetails.old_price}
            onChange={changeHandler}
            placeholder="Type here"
          />
          {errors.old_price && (
            <p className="error-message">{errors.old_price}</p>
          )}
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            type="number"
            name="new_price"
            value={productDetails.new_price}
            onChange={changeHandler}
            placeholder="Type here"
          />
          {errors.new_price && (
            <p className="error-message">{errors.new_price}</p>
          )}
        </div>
      </div>

      <div className="add-product-category-column">
        <div className="addproduct-itemfield">
          <p>Stock Status</p>
          <select
            value={productDetails.stock_status}
            name="stock_status"
            className="add-product-selector"
            onChange={changeHandler}
          >
            <option value="InStock">In Stock</option>
            <option value="OutOfStock">Out of Stock</option>
          </select>
        </div>

        <div className="addproduct-itemfield">
          <p>Category</p>
          <select
            value={productDetails.category}
            name="category"
            className="add-product-selector"
            onChange={changeHandler}
          >
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Groceries">Groceries</option>
          </select>
        </div>
      </div>

      {/* Image Upload */}
      <div className="addproduct-itemfield">
        <p>Product image</p>
        <label htmlFor="file-input">
          <img
            className="addproduct-thumbnail-img"
            src={!image ? upload_area : URL.createObjectURL(image)}
            alt="Product"
          />
        </label>
        <input
          onChange={(e) => {
            setImage(e.target.files[0]);
            setErrors({ ...errors, image: "" });
          }}
          type="file"
          name="image"
          id="file-input"
          accept="image/*"
          hidden
        />
        {errors.image && <p className="error-message">{errors.image}</p>}
      </div>

      {/* Submit Button */}
      <button
        className="addproduct-btn"
        onClick={handleAddProduct}
        disabled={loading}
      >
        {loading ? "Adding..." : "ADD"}
      </button>
    </div>
  );
};

export default AddProduct;
