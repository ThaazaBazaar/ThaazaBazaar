import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

const Item = (props) => {
  if (!props) {
    return (<div>Error Loading Product</div>);
  }
  const category = props.category.toLowerCase();
  return (
    <div className="item">
      <Link to={`/${category}/${props.id}`}>
        {console.log("id in item " + props.id)}
        {console.log("category in item " + category)}
        <img
          onClick={window.scrollTo(0, 0)}
          src={props.image}
          alt={props.name}
        />
      </Link>
      <div className="item-content">
        <p>{props.name}</p>
        <div className="item-prices">
          <div className="item-price-new">
            ₹ {props.new_price}
            {props.category !== "Groceries" && "/kg"}
          </div>
          <div className="item-price-old">
            ₹ {props.old_price}
            {props.category !== "Groceries" && "/kg"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
