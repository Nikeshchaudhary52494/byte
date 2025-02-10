import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader.jsx";
import { useSelector } from 'react-redux';
import { STATUSES } from '../../store/statuses.js';
import ProductCard from "../layout/ProductCard.jsx";
import { FaFilter } from "react-icons/fa"
import ProductFilter from "./productFilter.jsx";
import NoProductAvailable from "../layout/NoProductAvailable.jsx";
import MetaData from "../layout/MetaData.jsx";

const Products = () => {

    const { data: products, status } = useSelector((state) => state.products);
    const [toggleFilter, setToggleFilter] = useState(false);

    useEffect(() => {
        const handleScroll = (event) => {
            if (toggleFilter) {
                event.preventDefault();
            }
        };
        document.body.addEventListener("wheel", handleScroll, { passive: false });
        return () => {
            document.body.removeEventListener("wheel", handleScroll);
        };
    }, [toggleFilter]);

    if (status === STATUSES.LOADING)
        return <Loader />


    return (
        <>
            <MetaData title={"Products"} />
            {/* filter option */}
            <div onClick={() => setToggleFilter(!toggleFilter)} className="bg-blue-600  cursor-pointer m-2 fixed flex  gap-5 items-center justify-center text-white rounded-full p-2 sm:px-4 sm:py-2">
                < FaFilter />
                <p className=" sm:block hidden">Filters</p>
            </div>
            <div className={`inset-0 z-20 fixed bg-black backdrop-filter bg-opacity-50 backdrop-blur-md ${toggleFilter ? `block` : `hidden`}`}>
                <div className={`${toggleFilter ? `z-30 block` : `hidden`}`}>
                    <ProductFilter toggleFilter={toggleFilter} setToggleFilter={setToggleFilter} />
                </div>
            </div>
            {products.length === 0 ? <NoProductAvailable /> : <div
                class="flex mx-auto max-w-[80%] justify-center flex-wrap"
            >
                {products && products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>}
        </>
    )
}

export default Products