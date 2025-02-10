import React, { useState, useEffect } from 'react';
import { MdDoneOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
const PaymentSucessfull = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className='inset-0 fixed flex z-10 flex-col justify-center items-center bg-slate-900 top-0'>
                    <div className='flex flex-col items-center'>
                        <MdDoneOutline className='text-green-400 text-5xl' />
                        <p className='text-white text-2xl font-bold'>Payment Successful</p>
                        <p className='text-cyan-500'>Order placed</p>
                    </div>
                    <Link to="/">
                        <div className='mt-20 p-2 text-white font-bold bg-blue-500'>
                            Continue Shopping
                        </div>
                    </Link>
                </div>
            )}
        </>
    );
};

export default PaymentSucessfull;
