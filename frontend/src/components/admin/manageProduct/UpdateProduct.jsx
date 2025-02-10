import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts, resetIsProductUpdated, updatedProduct } from '../../../slices/adminSlice/adminSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { STATUSES } from '../../../store/statuses';
import Loader from '../../layout/Loader/Loader';
const UpdateProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { productDetails, status } = useSelector((state) => state.products);
    const { isProductUpdated } = useSelector((state) => state.admin);
    const { _id, name, price, description, category, stock, itemCondition } = productDetails;
    const [imagesPreview, setImagesPreview] = useState([]);
    const [images, setImages] = useState(null);
    const [formData, setFormData] = useState({
        name,
        description,
        price,
        category,
        stock,
        itemCondition,
    });

    const categories = [
        "Laptop",
        "Phone",
        "Watches",
        "Fashion",
        "Households",
        "Sound",
        "Toys",
        "Furniture",
        "Books",
        "Camera",
        "MISCELLANEOUS"
    ];
    const condition = [
        "New",
        "Renewed"
    ]
    const productImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        setImagesPreview([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = new FormData();
        productData.append('name', formData.name);
        productData.append('description', formData.description);
        productData.append('price', formData.price);
        productData.append('category', formData.category);
        productData.append('stock', formData.stock);
        productData.append('itemCondition', formData.itemCondition);
        if (images) {
            for (const image of images) {
                productData.append('images', image);
            }
        }
        dispatch(updatedProduct({ _id, productData }));
    };

    useEffect(() => {
        setFormData({
            name,
            description,
            price,
            category,
            stock,
            itemCondition,
        });
        if (isProductUpdated) {
            toast.success("Product Updated");
            dispatch(resetIsProductUpdated());
            dispatch(getAdminProducts())
            navigate("/admin/manageproduct");

        }
    }, [productDetails, navigate, name, description, price, category, isProductUpdated, itemCondition, dispatch, stock]);

    if (status === STATUSES.LOADING)
        return <Loader />

    return (
        <div className="bg-slate-800 p-5 border rounded-lg text-white">
            <h3 className="text-xl mb-4 text-cyan-500 font-bold text-center">Edit Product Details</h3>
            <form
                className="flex gap-4 items-center text-black flex-col"
                onSubmit={handleSubmit}
            >
                <input
                    required
                    className="w-[300px] outline-none p-2 rounded-md"
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <textarea
                    required
                    className="w-[300px] outline-none p-2 rounded-md"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                />
                <input
                    required
                    className="w-[300px] outline-none p-2  rounded-md"
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleInputChange}
                />
                <select className='p-2 w-[300px] rounded-sm outline-none'
                    onChange={handleInputChange}
                    required
                    value={formData.category}
                    name='category'>
                    <option value="">Choose Category</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <select className='p-2 w-[300px] rounded-sm outline-none'
                    onChange={handleInputChange}
                    required
                    value={formData.itemCondition}
                    name='itemCondition'>
                    <option value="">Item Condition</option>
                    {condition.map((condition) => (
                        <option key={condition} value={condition}>
                            {condition}
                        </option>
                    ))}
                </select>
                <input
                    required
                    className="w-[300px] outline-none p-2  rounded-md"
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                />
                <label htmlFor="inputImage" className='bg-blue-500 w-[300px] p-2 rounded-md'>Choose Image</label>
                <input
                    id='inputImage'
                    className="w-[300px] hidden outline-none p-2  rounded-md"
                    type="file"
                    name="image"
                    multiple
                    accept="image/*"
                    onChange={productImagesChange}
                />
                <div className='border overflow-x-scroll h-16 flex gap-1 items-center px-1 rounded-sm bg-slate-700 w-[300px]'>
                    {imagesPreview.map((image, index) => (
                        <img className='h-14 w-14 object-cover' key={index} src={image} alt="Product Preview" />
                    ))}
                </div>
                <motion.input
                    type="submit"
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="w-[300px]  h-[40px] hover:bg-teal-700 bg-teal-600 rounded-sm"
                />
            </form>
        </div>
    );
};

export default UpdateProduct;
