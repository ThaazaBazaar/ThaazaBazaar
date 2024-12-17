import React,{useEffect, useState} from 'react'
import './RelatedProducts.css'
// import data_product from '../Assets/all_product'
import Item from '../Item/Item'
import { Link } from "react-router-dom";
// import { ShopContext } from "../../Context/ShopContext";
import { backend_url } from '../../App';
const RelatedProducts = (props) => {
  // const { product } = props;
  // const { products } = useContext(ShopContext);
  // const { productId } = useParams(); // Get productId from the route
  
  const [products, setProducts] = useState(null); // State for product details
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling
  const { productId, productCategory } = props;
  useEffect(() => {
    
 
    const fetchAllProducts = async () => {
      try {
        const response = await fetch(
          `${backend_url}/api/products/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        console.log(data);
        console.log(products);
        setProducts(data); // Set product details
        console.log(products);
      } catch (err) {
        setError(err.message); // Handle any error that occurs
      } finally {
        setLoading(false); // Set loading to false once the request completes
      }
    };

    fetchAllProducts();
  }, []); // Re-run this effect when productId changes

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!products || !productCategory) {
    return <div className="no-product">Product not found!</div>;
  }
  // Filter related products based on the current product category and limit to 3–4 items
  

  const relatedProducts = products
    .filter(
      (item) => productCategory === item.category && productId !== item._id
    )
    .slice(0, 4); // Select only the first 4 related products

  return (
    <div className="relatedproducts">
      <h1>Related {productCategory}</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedProducts?.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
      {/* {console.log(product.category.toLowerCase())} */}
      <Link to={`/${productCategory.toLowerCase()}`}>
        
      <div className="shopcategory-loadmore" onClick={window.scrollTo(0, 0)}>
        See All
      </div>
      </Link>
    </div>
  );
}

export default RelatedProducts
