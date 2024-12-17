import React from 'react'
import './DescriptionBox.css'
import { useParams } from "react-router-dom";
import { backend_url } from "../../App";
import { useState, useEffect } from "react";

const DescriptionBox = () => {

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
    return <div className="loading">Loading Description..</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!product) {
    return <div className="no-product">Product not found!</div>;
  }
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Product Description</div>
        {/* <div className="descriptionbox-nav-box fade">Reviews (122)</div> */}
      </div>
      <div className="descriptionbox-description">
        {/* <p>An e-commerce website is an online platform that facilitates the
          buying and selling of products or services over the internet. It
          serves as a virtual marketplace where businesses and individuals can
          showcase their products, interact with customers, and conduct
          transactions without the need for a physical presence. E-commerce
          websites have gained immense popularity due to their convenience,
          accessibility, and the global reach they offer.</p> */}
          {/* <p>
          E-commerce websites typically display products or services along with
          detailed descriptions, images, prices, and any available variations
          (e.g., sizes, colors). Each product usually has its own dedicated page
          with relevant information.
          </p> */}
        
        {
          product && product.description && (
            <p>{product.description}</p>
          )
        }
          {/* <p>{props.product.description}</p> */}

      </div>
    </div>
  )
}

export default DescriptionBox
