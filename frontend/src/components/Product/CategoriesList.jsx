import React from 'react'
import { motion } from "framer-motion"
import { useDispatch } from 'react-redux'
import { fetchProducts, setFilters } from '../../slices/productSlice/productsSlice';
import { useNavigate } from 'react-router-dom';
import { categoriesList } from '@/lib/categoriesList';

const CategoriesList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleCategoryClick = (categoryName) => {
        dispatch(fetchProducts({ categoryName }));
        dispatch(setFilters({ categoryName }));
        navigate("/products")
    };

    return (
        <>
            {categoriesList.map((category) =>
                <motion.div
                    key={category.categoryName}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => handleCategoryClick(category.categoryName)}
                    className="w-[100px] mt-1 p-1 hover:shadow-lg cursor-pointer sm:border-none rounded-lg flex items-center flex-shrink-0 justify-center flex-col h-[100px]" >
                    <img className="h-[75%]"
                        src={category.imgAddress}
                        alt={category.categoryName} />
                    <p>{category.categoryName}</p>
                </motion.div>

            )}
        </>
    )
}

export default CategoriesList;

