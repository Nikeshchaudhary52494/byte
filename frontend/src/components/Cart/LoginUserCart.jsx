import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCartProducts, removeFromCart, resetIsProductRemovedFromCart } from '../../slices/cartSlice/cartSlice';
import CartItemCard from './CartItemCard';
import { Link, useNavigate } from 'react-router-dom';
import { STATUSES } from '../../store/statuses';
import { toast } from 'react-toastify';
import CartSkeletons from '../Skeletons/CartSkeletons';

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
        return <CartSkeletons />

    return (
        <div className='flex items-start justify-center h-full bg-background'>
            <div className='w-full p-2 border rounded shadow-md md:max-w-6xl mt-14'>
                <div className='h-24 p-2 text-3xl font-bold rounded-md'>
                    <h4>Shopping Cart</h4>
                </div>
                <div className=''>
                    {
                        products.map((product) => (
                            < CartItemCard key={product.productId} product={product} removeProductFromCart={removeProductFromCart} />
                        ))
                    }
                </div>
                {products.length > 0 ?
                    <div className='p-5 text-right'>
                        <p>Total price: <span className='text-xl font-bold text-orange-500'>${totalPrice}</span></p>
                        <button onClick={handelCheckout} className='p-2 bg-orange-400'>CheckOut</button>
                    </div>
                    : <div className='font-bold text-center h-44'>
                        <p className='italic text-blue-500'>No Product Added To cart</p>

                        <Link to='/'>
                            <button className='p-2 m-2 bg-blue-500 rounded-sm' >Continue Shopping</button>
                        </Link>
                    </div>}
            </div>
        </div>
    );
};

export default LoginUserCart;
