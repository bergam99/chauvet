import React from "react";
import "./ProductItem.css";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  return (
    <>
      <img
        className="ProductItem__img"
        src={product?.images[0]?.url}
        alt={product?.name}
      />
      <h5>
        <Link to={`/product/${product?._id}`}>{product?.name}</Link>
      </h5>
      <p>{product?.price}</p>
      <Link to={`/product/${product?._id}`}>Voir plus</Link>
    </>
  );
};

export default ProductItem;
