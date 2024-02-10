import React from "react";
import "./Shop.css";
import { useGetProductsQuery } from "../../redux/api/productApi";
import ProductItem from "../../components/ProductItem/ProductItem";
import Loader from "../../components/Loader/Loader";

const Shop = () => {
  const { data, isLoading } = useGetProductsQuery();

  if (isLoading) return <Loader />;
  return (
    <>
      <div className="Shop">
        {/* filter */}
        <main className="Shop__Main">
          <form action="your_search_action_url_here" method="get">
            <div>
              <input type="text" placeholder="Enter Product Name ..." />
              <button type="submit">go</button>
            </div>
          </form>
          {/* product */}
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
