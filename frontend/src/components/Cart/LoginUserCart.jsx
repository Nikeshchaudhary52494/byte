import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCartProducts, removeFromCart, resetIsProductRemovedFromCart } from '../../slices/cartSlice/cartSlice';
import CartItemCard from './CartItemCard';
import { Link, useNavigate } from 'react-router-dom';
import { STATUSES } from '../../store/statuses';
import Loader from '../layout/Loader/Loader';
import { toast } from 'react-toastify';

const LoginUserCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data, status, isProductRemovedFromCart } = useSelector((state) => state.cart);
    const { products, totalPrice } = data;
    const removeProductFromCart = (productId) => {
        dispatch(removeFromCart({ productId }));
    }
    const handelCheckout = () => {
        const storedShippingData = localStorage.getItem('shippingData');
        if (!storedShippingData)
            navigate("/cart/checkout");
        else
            navigate("/cart/shippingInfo");
    }

    useEffect(() => {
        dispatch(getAllCartProducts());
        if (isProductRemovedFromCart) {
            toast.success("Product removed");
            dispatch(resetIsProductRemovedFromCart());
        }
    }, [dispatch, isProductRemovedFromCart]);

    if (status === STATUSES.LOADING)
        return <Loader />

    return (
        <>
            <div className='flex items-start justify-center border-t border-slate-700 bg-slate-800 min-h-screen text-white'>
                <div className='md:max-w-[70%] max-w-[90%] p-2 mt-14 w-full rounded-md bg-slate-700 bg-opacity-20'>
                    <div className='h-24 p-2 text-3xl font-bold rounded-md'>
                        <h4>Shopping Cart</h4>
                    </div>
                    <div className='flex flex-col justify-center items-center my-2 min-h-44 rounded-md p-5'>
                        {
                            products.map((product) => (
                                < CartItemCard key={product.productId} product={product} removeProductFromCart={removeProductFromCart} />
                            ))
                        }
                    </div>
                    {products.length > 0 ?
                        <div className='text-right p-5'>
                            <p>Total price: <span className='text-orange-500 font-bold text-xl'>${totalPrice}</span></p>
                            <button onClick={handelCheckout} className='bg-orange-400 p-2'>CheckOut</button>
                        </div>
                        : <div className='text-center h-44 font-bold'>
                            <p className='italic  text-blue-500'>No Product Added To cart</p>

                            <Link to='/'>
                                <button className='bg-blue-500 p-2 m-2 rounded-sm' >Continue Shopping</button>
                            </Link>
                        </div>}
                </div>
            </div>
        </>
    );
};

export default LoginUserCart;
