import React, { useEffect } from "react";
import { BsMouse } from "react-icons/bs";
import Typed from "react-typed";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES } from '../../store/statuses';
import ProductCard from "../layout/ProductCard";
import CategoriesList from "../Product/CategoriesList";
import Footer from "../layout/Footer";
import { fetchProducts, setCurrentPage } from "../../slices/productSlice/productsSlice";
import { Skeleton } from "@mui/material";
import ProductPagination from "./ProductPagination";
import { useSearchParams } from "react-router-dom";


const Home = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const { data: products, totalPages, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(setCurrentPage(page));
    dispatch(fetchProducts({ page, limit: 8 }));
  }, [dispatch, page]);

  console.log({ products });

  return (
    <>
      <MetaData title={"Home"} />

      {
        page == 1 && <>
          <div className="md:flex overflow-x-auto overflow-y-hidden hidden">
            <div className="px-4 space-x-4 flex mx-auto">
              <CategoriesList />
            </div>
          </div>

          <div className=" min-h-screen md:min-h-[85vh]  flex flex-col text-white bg-custom-background text-2xl justify-center items-center">
            <p className="font-mono text-xl">Welcome To Byte Ecommerce</p>
            <h2 className="font-bold text-center m-24 text-3xl">
              <Typed
                strings={["FIND AMAZING PRODUCTS HERE..."]}
                typeSpeed={100}
                loop={true}
                backSpeed={50}
              />
            </h2>
            <a className="flex gap-2 items-center hover:text-cyan-600 duration-300 " href="#container">
              <BsMouse />
              <span>Scroll</span>
            </a>
          </div>
        </>
      }

      {status === STATUSES.LOADING ? (<div
        className="flex mx-auto max-w-[80%] justify-center flex-wrap" >
        {
          [...Array(8)].map(() => (
            <Skeleton variant="rectangular" className="m-4 rounded-sm" width={250} height={400} />
          ))
        }
      </div>) : (<div
        className="flex mx-auto max-w-[80%] justify-center flex-wrap" >
        {products && products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>)}

      <ProductPagination currentPage={page} totalPages={totalPages} />
      <Footer />
    </>
  );
}

export default Home;
