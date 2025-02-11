import React, { useEffect, useState } from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES } from '../../store/statuses';
import ProductCard from "../layout/ProductCard";
import Footer from "../layout/Footer";
import { fetchProducts, setCurrentPage } from "../../slices/productSlice/productsSlice";
import ProductPagination from "./ProductPagination";
import { useSearchParams } from "react-router-dom";
import Hero from "./Hero";
import FilterModal from "../Product/FilterModal";
import ProductsSkeletons from "../Skeletons/ProductsSkeletons";


const Home = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const { data: products, totalPages, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(setCurrentPage(page));
    dispatch(fetchProducts({ page, limit: 8 }));
  }, [dispatch, page]);

  return (
    <>
      <MetaData title={"Home"} />

      {page < 2 && <Hero />}
      <div className="relative">
        <div className="absolute top-4 left-4">
          <FilterModal />
        </div>
        <div className="max-w-6xl p-10 mx-auto">
          {status === STATUSES.LOADING ? (
            <ProductsSkeletons />
          ) : (
            <div
              className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4" >
              {products && products.map((product) => (
                <ProductCard key={product._id} product={product} />
              )
              )}
            </div>)}
        </div>
        <div className="mt-10">
          <ProductPagination currentPage={page} totalPages={totalPages} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
