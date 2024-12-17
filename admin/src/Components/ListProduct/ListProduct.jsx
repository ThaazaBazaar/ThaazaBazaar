import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../Assets/cross_icon.png";
import edit_icon from "../Assets/edit_icon"; // Edit icon
import { backend_url, currency } from "../../App";
import AddProduct from "../AddProduct/AddProduct";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  // Fetch all products
  const fetchInfo = () => {
    fetch(`${backend_url}/api/products`)
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  // Remove product with confirmation alert
  const removeProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this product?"
    );

    if (confirmDelete) {
      try {
        await fetch(`${backend_url}/api/products/${id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        alert("Product removed successfully!");
        fetchInfo(); // Refresh product list
      } catch (error) {
        console.error("Error removing product:", error);
        alert("Failed to remove product. Please try again.");
      }
    } else {
      alert("Product removal cancelled.");
    }
  };

  // Function to handle Edit
  const handleEdit = (product) => {
    setProductToEdit(product); // Set the product to be edited
    setIsEditing(true); // Enter edit mode
  };

  return (
    <>
      {!isEditing ? (
    <div className="listproduct">
      <h1>All Products List</h1>
          <div className="listproduct-format-main">
            <p>Product Image</p>
            <p>Title</p>
            <p>Description</p>
            <p>Category</p>
            <p>Old Price</p>
            <p>New Price</p>
            <p>Stock Status</p>
            <p>Actions</p>
          </div>

          <div className="listproduct-allproducts">
            <hr />
            {allProducts.map((e, index) => (
              <div key={index}>
                <div className="listproduct-format-main listproduct-format">
                  <div className="listproduct-img-container">
                    <img
                      className="listproduct-product-icon"
                      src={e.image}
                      alt=""
                    />
                  </div>
                  <p className="cartitems-product-title">{e.name}</p>
                  <p>{e.description}</p>
                  <p>{e.category}</p>
                  <p>
                    {currency}
                    {e.old_price}
                  </p>
                  <p>
                    {currency}
                    {e.new_price}
                  </p>
                  <p>{e.stock_status}</p>
                  <div className="listproduct-actions">
                    {/* Edit Button */}
                    <img
                      className="listproduct-edit-icon"
                      src={edit_icon}
                      alt="Edit"
                      onClick={() => handleEdit(e)}
                    />

                    {/* Remove Button */}
                    <img
                      className="listproduct-remove-icon"
                      src={cross_icon}
                      alt="Remove"
                      onClick={() => removeProduct(e._id)} // Trigger confirmation
                    />
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>
          </div>
        
      ) : (
          // Render AddProduct component for editing
          <>
            
        <AddProduct productToEdit={productToEdit} fetchInfo={fetchInfo} setIsEditing={setIsEditing}/>
          </>
      )}
      </>
  );
};

export default ListProduct;
