import React from "react";
import "./Shop.css";
import { useGetProductsQuery } from "../../redux/api/productApi";
import ProductItem from "../../components/ProductItem/ProductItem";
import Loader from "../../components/Loader/Loader";
import Search from "../../components/Search/Search";
import { useLocation, useSearchParams } from "react-router-dom";

const Shop = () => {
  let [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const location = useLocation();

  const params = { keyword };

  const { data, isLoading } = useGetProductsQuery(params);

  if (isLoading) return <Loader />;

  return (
    <>
      <div>
        <main>
          {location.pathname === "/" ? (
            <img
              src={data?.products[0]?.images[0].url}
              alt={data?.products?.name}
              className="Shop__currentItem"
            />
          ) : undefined}
          <Search />
          <section className="Shop__pd">
            {data?.products?.map((product) => (
              <ProductItem product={product} key={product?._id} />
            ))}
          </section>
        </main>
      </div>
    </>
  );
};

export default Shop;
