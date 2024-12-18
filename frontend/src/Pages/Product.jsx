import React, { useEffect, useState } from "react";
// import { ShopContext } from '../Context/ShopContext'
import { useParams } from "react-router-dom";
import { backend_url } from "../App";
// import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

const Product = () => {
  // const {products}= useContext(ShopContext);
  // const product = products.find((e)=> e.id === Number(productId));

  const { productId } = useParams(); // Get productId from route
  const [product, setProduct] = useState(null); // State for product details
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  // Fetch product details from the backend
  useEffect(() => {
    // Fetch product details
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `${backend_url}/api/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data); // Set product details
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

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
    <div>
      <ProductDisplay product={product} /> {/* Pass product as prop */}
      <DescriptionBox product={product} /> {/* Pass product as prop */}
      <RelatedProducts
        productId={product._id}
        productCategory={product.category}
      />
      {/* Pass product details */}
    </div>
  );
};

export default Product;
