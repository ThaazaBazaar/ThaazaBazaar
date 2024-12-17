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

  // Fetch product details from the backend
  const [product, setProduct] = useState(null); // State for product details
  const [loading, setLoading] = useState(true); // State for loading indicator
  // const [error, setError] = useState(null); // State for error handling
  const { productId } = useParams();
  useEffect(() => {
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
        console.log("We have one" + product);
        setProduct(data); // Set product details
        // console.log(product);
      } catch (err) {
        console.log(err.message); // Handle any error that occurs
      } finally {
        setLoading(false); // Set loading to false once the request completes
      }
    };

    fetchProductDetails();
  }, [productId]);
  // if (loading) {
  //   return <div className="loading">Loading product details...</div>;
  // }

  // if (error) {
  //   return <div className="error">{error}</div>;
  // }

  // if (!product) {
  //   return <div className="no-product">Product not found!</div>;
  // }
  return (
    <div>
      {/* <Breadcrum product={product}/> */}

      {console.log("got here " + product)}
      {console.log(product)}
      <ProductDisplay />
      <DescriptionBox />
      {/* <RelatedProducts productId={productId} productCategory={product?.category} /> */}
    </div>
  );
};

export default Product;
