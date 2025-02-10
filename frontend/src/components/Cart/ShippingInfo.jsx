import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../slices/cartSlice/cartSlice';
import { createNewOrder, resetIsOrderCreated } from '../../slices/orderSlice/orderSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const ShippingInfo = () => {
    const storedShippingData = localStorage.getItem('shippingData');
    const parsedShippingData = JSON.parse(storedShippingData);
    const { address, country, state, pinCode, phoneNumber } = parsedShippingData;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data } = useSelector((state) => state.cart);
    const { products, totalPrice } = data;
    const { isOrderCreated } = useSelector((state) => state.orders)
    const handelPay = () => {
        const orderData = {
            shippingInfo: parsedShippingData,
            orderItems: products,
            paymentInfo: "Done",
            itemsPrice: totalPrice,
            shippingPrice: 5,
            totalPrice: totalPrice + 5,
        }
        dispatch(createNewOrder({ orderData }));
    }
    useEffect(() => {
        if (isOrderCreated) {
            dispatch(resetIsOrderCreated());
            dispatch(clearCart());
            navigate("/cart/orderplaced");
            toast.success("Order placed");
        }
    }, [dispatch, isOrderCreated, navigate])
    return (
        <>
            <div className='inset-0 fixed top-0 z-10 justify-center pt-20 px-10 bg-slate-900'>
                <div className='bg-slate-800 p-8 rounded-lg max-w-4xl mx-auto  shadow-md'>
                    <h3 className='text-3xl text-cyan-500 font-bold mb-6'>Shipping Information</h3>
                    <div className='text-xl text-white'>
                        <p className='mb-4'>
                            <span className='text-cyan-500 font-bold'>Address:</span> <span>{address} | {state} | {country} </span>
                        </p>
                        <p className='mb-4'>
                            <span className='text-cyan-500 font-bold'>Pin Code:</span><span> {pinCode}</span>
                        </p>
                        <p className='mb-4'>
                            <span className='text-cyan-500 font-bold'>Phone Number:</span><span> {phoneNumber}</span>
                        </p>
                    </div>
                    <div className='flex gap-2 text-white font-bold justify-between'>
                        <button
                            onClick={handelPay}
                            className='bg-green-500 p-2 active:bg-green-600 w-40 rounded-md'>
                            PAY
                        </button>
                        <button
                            onClick={() => navigate("/cart/checkout")}
                            className='bg-blue-500 p-2 active:bg-blue-600 w-40 rounded-md'>
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShippingInfo;
