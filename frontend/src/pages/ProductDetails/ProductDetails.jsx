import React, { useEffect, useState } from "react";
import { useGetProductQuery } from "../../redux/api/productApi";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import "./ProductDetails.css";
import { useDispatch } from "react-redux";
import { setCartItem } from "../../redux/features/cartSlice";

const ProductDetails = () => {
  const params = useParams();
  const { data, isLoading } = useGetProductQuery(params?.id);
  const product = data?.product;
  const [activeImg, setActiveImg] = useState("");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setActiveImg(
      product?.images[0]
        ? product?.images[0].url
        : "/imgs/products/default_product.png" // verifie si ça render bien
    );
  }, [product]);

  if (isLoading) return <Loader />;

  // =============================
  const increseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= product?.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };
  // =============================
  const decreseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };
  // =============================
  // add to cart

  const setItemToCart = () => {
    const cartItem = {
      product: product?._id,
      name: product?.name,
      price: product?.price,
      image: product?.images[0]?.url,
      stock: product?.stock,
      quantity,
    };

    dispatch(setCartItem(cartItem));
    setMsg("ajouté !");
  };

  return (
    <>
      <h1>ProductDetails</h1>
      <section>
        <img
          src={activeImg}
          alt={product?.name}
          className="ProductDetails__topImg"
        />
        <h2>{product?.name}</h2>
        <p>{product?.price}</p>
        {/* ======== +,- ========*/}
        <div>
          <span onClick={decreseQty}>-</span>
          <input type="number" className="count" value={quantity} readonly />
          <span onClick={increseQty}>+</span>
        </div>

        <button
          type="button"
          id="cart_btn"
          className="btn btn-primary d-inline ms-4"
          disabled={product.stock <= 0}
          onClick={setItemToCart}
        >
          Add to Cart
        </button>

        {product.stock <= 0 ? "stock épuisé" : msg}

        {/* ====================== */}
        <p>{product?.description}</p>
        <p>{product?.stock < 0 && "stock épuisé"}</p>
        {product?.images?.map((img) => (
          <img
            src={img?.url}
            alt={img?.url}
            key={img.url}
            className="ProductDetails__imgs"
          />
        ))}
      </section>
    </>
  );
};

export default ProductDetails;
