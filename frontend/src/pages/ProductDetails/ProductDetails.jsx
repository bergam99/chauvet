import React, { useEffect, useState } from "react";
import { useGetProductQuery } from "../../redux/api/productApi";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import "./ProductDetails.css";

const ProductDetails = () => {
  const params = useParams();
  const { data, isLoading } = useGetProductQuery(params?.id);
  const product = data?.product;
  const [activeImg, setActiveImg] = useState("");

  useEffect(() => {
    setActiveImg(
      product?.images[0]
        ? product?.images[0].url
        : "/imgs/products/default_product.png" // verifie si ça render bien
    );
  }, [product]);

  if (isLoading) return <Loader />;

  return (
    <>
      <h1>ProductDetails</h1>
      <section>
        <img src={activeImg} alt={product?.name} />
        <h2>{product?.name}</h2>
        <p>{product?.price}</p>
        <p>{product?.description}</p>
        <p>{product?.stock < 0 && "stock épuisé"}</p>
        {product?.images?.map((img) => (
          <img src={img?.url} alt={img?.url} />
        ))}
      </section>
    </>
  );
};

export default ProductDetails;
