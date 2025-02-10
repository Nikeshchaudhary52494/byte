import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EditProduct from './UpdateProduct';
import { getProductDetails } from '../../../slices/productSlice/productsSlice';
import { MdStar } from 'react-icons/md';
import { STATUSES } from '../../../store/statuses';
import Loader from '../../layout/Loader/Loader';

const ManageSingleProduct = () => {
    const dispatch = useDispatch();

    const { productDetails, status } = useSelector((state) => state.products);
    const { id } = useParams();
    const { name, price, description, rating, createdAt, category, images, stock } = productDetails;

    useEffect(() => {
        dispatch(getProductDetails({ id }));
    }, [dispatch, id]);

    if (status === STATUSES.LOADING) {
        return <div className="w-full grid place-content-center h-screen ">
            <Loader />
        </div>
    }


    return (
        <div className='flex min-h-screen flex-col md:flex-row gap-10 bg-slate-900 justify-center p-5'>
            <div className='bg-slate-800 p-8 rounded-lg md:w-[50%] lg:w-[70%] shadow-md'>
                <div className='flex justify-between items-center '>
                    <h3 className='text-3xl text-cyan-500 font-bold mb-6'>Product Details</h3>
                </div>
                <div className='text-xl text-white'>
                    <p className='mb-4'>
                        <span className='text-cyan-500 font-bold '>Name:</span> <span>{name}</span>
                    </p>
                    <p className='mb-4'>
                        <span className='text-cyan-500 font-bold'>Price:</span> <span className='text-orange-400'>${price}</span>
                    </p>
                    <p className='mb-4'>
                        <span className='text-cyan-500 font-bold'>Stock:</span> <span className={`font-normal ${stock < 1 ? `text-red-400` : 'text-green-400'}`}>{`${stock < 1 ? `Out of Stock` : `Only ${stock} Unit left`}`}</span>
                    </p>
                    <p className='mb-4'>
                        <span className='text-cyan-500 font-bold'>Category:</span><span> {category}</span>
                    </p>
                    <p className='mb-4'>
                        <span className='text-cyan-500 font-bold'>Created At:</span><span> {createdAt}</span>
                    </p>
                    <p className=' flex gap-1 mb-4'>
                        <span className='text-cyan-500 font-bold'>Rating:</span><span className='flex gap-1 items-center' > {rating}<MdStar className='text-yellow-400' /> </span>
                    </p>
                    <p className='text-cyan-500 font-bold mb-4' >Images:</p>
                    <div className='bg-slate-700 px-1 max-w-fit overflow-x-auto flex items-center gap-1 h-16 border rounded mb-4'>
                        {images && images.map((image) => (
                            <img alt='images' className='h-14 object-cover w-14'
                                src={image.url} />))}
                    </div>
                    <p className='mb-4'>
                        <span className='text-cyan-500 font-bold'>Description:</span> <span className='text-sm'>{description}</span>
                    </p>
                </div>
            </div>
            <div>
                <EditProduct />
            </div>
        </div>
    );
};

export default ManageSingleProduct;
