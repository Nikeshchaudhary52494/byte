import { useDispatch, useSelector } from 'react-redux';
import { STATUSES } from '../../store/statuses.js';
import ProductCard from "../layout/ProductCard.jsx";
import NoProductAvailable from "../layout/NoProductAvailable.jsx";
import MetaData from "../layout/MetaData.jsx";
import FilterModal from "./FilterModal.jsx";
import ProductPagination from "../Home/ProductPagination.jsx";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchProducts, setCurrentPage, setFilters } from "@/slices/productSlice/productsSlice.js";
import ProductsSkeletons from "../Skeletons/ProductsSkeletons.jsx";

const Products = () => {

    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const { data: products, status, totalPages } = useSelector((state) => state.products);
    const page = parseInt(searchParams.get("page")) || 1;

    const { keyword } = useParams();

    useEffect(() => {
        if (keyword)
            dispatch(setFilters({ keyword }));
        dispatch(setCurrentPage(page));
        dispatch(fetchProducts());
    }, [keyword, dispatch, page]);

    if (status === STATUSES.LOADING)
        return <ProductsSkeletons />

    return (
        <div className="relative">
            <MetaData title={"Products"} />
            <div className="absolute top-4 left-4">
                <FilterModal />
            </div>
            {products.length === 0 ? <NoProductAvailable /> : <div
                class="flex mx-auto max-w-[80%] justify-center flex-wrap"
            >
                {products && products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>}
            <div className="mt-10">
                <ProductPagination currentPage={page} totalPages={totalPages} />
            </div>
        </div>
    )
}

export default Products