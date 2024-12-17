import React, { useState, useEffect } from "react";
import "./AddProduct.css";
import upload_area from "../Assets/upload_area.svg";
import { backend_url } from "../../App";

const AddProduct = ({ productToEdit, fetchInfo, setIsEditing }) => {
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

  // Pre-populate fields if editing
  useEffect(() => {
    if (productToEdit) {
      setProductDetails({
        name: productToEdit.name || "",
        description: productToEdit.description || "",
        category: productToEdit.category || "Fruits",
        new_price: productToEdit.new_price || "",
        old_price: productToEdit.old_price || "",
        stock_status: productToEdit.stock_status || "InStock",
      });
      setImage(null); // Optional: Image will be updated only if a new one is selected
    }
  }, [productToEdit]);

  // Validate form fields
  // Validate form fields
  const validateFields = () => {
    const newErrors = {};
    if (!String(productDetails.name).trim())
      newErrors.name = "Product title is required.";
    if (!String(productDetails.description).trim())
      newErrors.description = "Product description is required.";
    if (!String(productDetails.old_price).trim())
      newErrors.old_price = "Price is required.";
    else if (!/^\d+$/.test(productDetails.old_price))
      newErrors.old_price = "Price must be a number.";
    if (!String(productDetails.new_price).trim())
      newErrors.new_price = "Offer price is required.";
    else if (!/^\d+$/.test(productDetails.new_price))
      newErrors.new_price = "Offer price must be a number.";
    if (!image && !productToEdit)
      newErrors.image = "Product image is required.";
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
  const handleSubmit = async () => {
    if (!validateFields()) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("name", productDetails.name);
    formData.append("description", productDetails.description);
    formData.append("category", productDetails.category);
    formData.append("new_price", productDetails.new_price);
    formData.append("old_price", productDetails.old_price);
    formData.append("stock_status", productDetails.stock_status);
    if (image) formData.append("image", image);

    const url = productToEdit
      ? `${backend_url}/api/products/${productToEdit._id}` // Update endpoint
      : `${backend_url}/api/products`; // Add endpoint

    const method = productToEdit ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert(
          productToEdit
            ? "Product Updated Successfully"
            : "Product Added Successfully"
        );
        if (productToEdit) {
          fetchInfo();
          setIsEditing(false);
        }
        else {
          setProductDetails({
            name: "",
            description: "",
            category: "Fruits",
            new_price: "",
            old_price: "",
            stock_status: "InStock",
          });
          setImage(null);
        }
      } else {
        alert(result.message || "Failed to process product. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="addproduct">
      <h1>{productToEdit ? "Edit Product" : "Add Product"}</h1>
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
            src={
              !image
                ? productToEdit?.image || upload_area
                : URL.createObjectURL(image)
            }
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
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading
          ? "Processing..."
          : productToEdit
          ? "Update Product"
          : "Add Product"}
      </button>
    </div>
  );
};

export default AddProduct;
