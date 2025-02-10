import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, getAdminProducts, resetIsProductAdded } from '../../../slices/adminSlice/adminSlice';
import { useNavigate } from 'react-router-dom';
import { STATUSES } from '../../../store/statuses';
import Loader from '../../layout/Loader/Loader';
import { toast } from 'react-toastify';
const AddProductForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, isProductAdded } = useSelector((state) => state.admin)

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: null,
        category: null,
        stock: null,
        itemCondition: null,
    });
    const [images, setImages] = useState();
    const [imagesPreview, setImagesPreview] = useState([]);
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
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
    const itemCondition = [
        "New",
        "Renewed"
    ]
    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = new FormData();
        productData.append('name', formData.name);
        productData.append('description', formData.description);
        productData.append('price', formData.price);
        productData.append('category', formData.category);
        productData.append('stock', formData.stock);
        productData.append('itemCondition', formData.itemCondition);
        for (const image of images) {
            productData.append('images', image);
        }
        dispatch(createProduct(productData));
    };
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

    useEffect(() => {
        if (isProductAdded) {
            toast.success("New Product Added");
            dispatch(resetIsProductAdded());
            dispatch(getAdminProducts());
            navigate("/admin/manageproduct");
        }
    })

    if (status === STATUSES.LOADING)
        return <Loader />

    return (
        <div className="flex overflow-auto bg-slate-900 h-screen fixed z-20 top-0 left-0 w-screen items-center justify-center">
            <div className="bg-slate-800 p-5 rounded-sm text-white border">
                <h3 className="text-xl mb-4 text-cyan-500 font-bold">Add Product</h3>
                <form
                    className="flex gap-3  text-black flex-col"
                    onSubmit={handleSubmit}
                >
                    <input
                        required
                        className="w-[300px] outline-none p-2 rounded-sm"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <textarea
                        required
                        className="w-[300px] outline-none p-2 rounded-sm"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                    <input
                        required
                        className="w-[300px] outline-none p-2  rounded-sm"
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleInputChange}
                    />
                    <select className='p-2 rounded-sm outline-none'
                        onChange={handleInputChange}
                        required
                        name='category'>
                        <option value="">Choose Category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <select className='p-2 rounded-sm outline-none'
                        onChange={handleInputChange}
                        required
                        name='itemCondition'>
                        <option value="">Item Condition</option>
                        {itemCondition.map((condition) => (
                            <option key={condition} value={condition}>
                                {condition}
                            </option>
                        ))}
                    </select>
                    <input
                        required
                        className="w-[300px] outline-none p-2  rounded-sm"
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                    />
                    <label className='bg-blue-500 p-2 rounded-sm' htmlFor="fileInput">
                        Choose Images
                    </label>
                    <input
                        id='fileInput'
                        className='hidden'
                        required
                        type="file"
                        name="images"
                        accept="image/*"
                        multiple
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
                        className="w-[300px]  p-2 text-white hover:bg-teal-700 bg-teal-600 rounded-sm"
                    />
                </form>
            </div>
        </div>
    );
};

export default AddProductForm;
