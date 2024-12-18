import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import "./CSS/ShopCategory.css";
// import { ShopContext } from "../Context/ShopContext";
// import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from "../Components/Item/Item";
import { backend_url } from "../App";

const ProductList = (props) => {
  // const { products } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  // const { category } = useParams();

   useEffect(() => {
     const fetchProducts = async () => {
       const response = await fetch(`${backend_url}/api/products`); 
       const data = await response.json();
       setProducts(data);
     };
     fetchProducts();
   }, []);
  
  return (
    <div className="shop-category">
      {/* <img className='shopcategory-banner' src={props.banner} alt="" /> */}
      <h1>
        We Deliver You <span>{props.items}</span> {props.category} !!
      </h1>
      {/* <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div> */}
      <div className="shopcategory-products">
        {products.length > 0 ? (
          products
            .filter((item) => props.category === item.category) // Filter by category
            .map((item, i) => (
              <Item
                key={i}
                id={item._id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
                category={item.category} // Pass category explicitly
              />
            ))
        ) : (
          <p>No Products Yet ....</p>
        )}
      </div>
      {/* <div className="shopcategory-loadmore">
        Explore More
      </div> */}
      <hr />
    </div>
  );
};

export default ProductList;
