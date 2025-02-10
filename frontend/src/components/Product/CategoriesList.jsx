import React from 'react'
import { motion } from "framer-motion"
import { useDispatch } from 'react-redux'
import { fetchProducts2, setCategory } from '../../slices/productSlice/productsSlice';
import { useNavigate } from 'react-router-dom';
import book from "../../assets/book.jpg"
import phone from "../../assets/iphone.webp"
import laptop from "../../assets/airbook.webp"
import sound from "../../assets/headPhone.webp"
import mopper from "../../assets/mopper.webp"
import shirt from "../../assets/shirt.jpg"
import teddy from "../../assets/teddy.webp"
import watch from "../../assets/watch2.jpg"
import sofa from "../../assets/sofa.avif"
import camera from "../../assets/camera.jpg"

const CategoriesList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const categoriesList = [{
        imgAddress: phone,
        categoryName: "Phone"
    },
    {
        imgAddress: laptop,
        categoryName: "Laptop"
    },
    {
        imgAddress: shirt,
        categoryName: "Fashion"
    },
    {
        imgAddress: mopper,
        categoryName: "Households"
    },
    {
        imgAddress: watch,
        categoryName: "Watches"
    },
    {
        imgAddress: sofa,
        categoryName: "Furniture"
    },
    {
        imgAddress: teddy,
        categoryName: "Toys"
    },
    {
        imgAddress: sound,
        categoryName: "Sound"
    },
    {
        imgAddress: camera,
        categoryName: "Camera"
    },
    {
        imgAddress: book,
        categoryName: "Books"
    }
    ]
    const handleCategoryClick = (categoryName) => {
        dispatch(fetchProducts2({ categoryName }));
        dispatch(setCategory(categoryName));
        navigate("/products")
    };

    return (
        <>
            {categoriesList.map((category) =>
                <motion.div
                    key={category.categoryName}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => handleCategoryClick(category.categoryName)}
                    className="w-[100px] mt-1 p-1 shadow-lg cursor-pointer bg-white sm:border-none rounded-lg flex items-center flex-shrink-0 justify-center flex-col h-[100px]" >
                    <img className="h-[75%]"
                        src={category.imgAddress}
                        alt={category.categoryName} />
                    <p>{category.categoryName}</p>
                </motion.div>

            )}
        </>
    )
}

export default CategoriesList

