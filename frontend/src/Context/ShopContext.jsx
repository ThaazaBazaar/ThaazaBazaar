import React, { createContext, useState, useEffect } from "react";
import {backend_url} from "../App";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]); // State to hold products
  const [cartItems, setCartItems] = useState({}); // State for cart items

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${backend_url}/api/products`);
          const data = await response.json(); // Convert response to JSON
          console.log(data);
          console.log(Array.isArray(data));
        setProducts(data); // Store fetched products in state

        // Initialize the cart with product IDs from the database
        let initialCart = {};
        data.forEach((product) => {
          initialCart[product.id] = 0; // Assuming each product has a unique `id` field
        });
        setCartItems(initialCart);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Add product to cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  // Remove product from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 0 ? prev[itemId] - 1 : 0, // Ensure it doesn't go below 0
    }));
  };

  // Calculate total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = products.find(
          (product) => product.id === Number(item)
        );
        if (itemInfo) {
          totalAmount += cartItems[item] * itemInfo.new_price; // Assuming `new_price` is the product price
        }
      }
    }
    return totalAmount;
  };

  // Calculate total items in cart
  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((acc, curr) => acc + curr, 0);
  };

  // Provide context value
  const contextValue = {
    products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
