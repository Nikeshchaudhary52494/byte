import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, getProductDetails, resetError, resetIsReviewAdded } from '../../../slices/productSlice/productsSlice';
import { toast } from 'react-toastify';
import { STATUSES } from '../../../store/statuses';
import Loader from '../../layout/Loader/Loader';

const AddReview = ({ toggle, setToggle, productId }) => {
    const dispatch = useDispatch();
    const { error, isReviewAdded, status } = useSelector((state) => state.products)

    const [review, setReview] = useState({
        comment: '',
        rating: 0,
    })
    const { comment, rating } = review;
    const handleInputChange = (e) => {
        if (e.target.name === 'rating') {
            let inputValue = parseInt(e.target.value, 10);
            inputValue = Math.min(Math.max(inputValue, 0), 5);
            setReview({ ...review, [e.target.name]: inputValue });
        }
        else if (e.target.name === 'comment') {
            setReview({ ...review, [e.target.name]: e.target.value });
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addReview({ rating, comment, productId }));

    };
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(resetError());
        }
        if (isReviewAdded) {
            dispatch(resetIsReviewAdded());
            dispatch(getProductDetails({ id: productId }));
        }
    }, [error, dispatch, isReviewAdded, productId]);

    if (status === STATUSES.LOADING)
        return <Loader />

    return (
        <>
            <div className='flex flex-col w-full justify-center items-center bg-slate-800 p-5 max-w-lg rounded-md'>
                <div className='flex items-center justify-between w-full max-w-md m-2'>
                    <p className='font-bold text-white'>Add review</p>
                    <button
                        className='bg-red-500 w-10 h-10 p-1 rounded-full focus:outline-none flex items-center justify-center'
                        onClick={() => setToggle(!toggle)}
                    >
                        x
                    </button>

                </div>

                <form onSubmit={handleSubmit} className='max-w-md w-full'>
                    <div className='mb-4'>
                        <label
                            htmlFor='comment'
                            className='block text-gray-500 text-sm font-bold mb-2'
                        >
                            Comment
                        </label>
                        <textarea
                            id='comment'
                            name='comment'
                            placeholder='Write review'
                            value={comment}
                            onChange={handleInputChange}
                            className='resize-none w-full h-32 outline-none rounded-md p-2'
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor='rating'
                            className='block text-gray-500 text-sm font-bold mb-2'
                        >
                            Rating
                        </label>
                        <input
                            type='number'
                            id='rating'
                            name='rating'
                            min='0'
                            max='5'
                            value={rating}
                            onChange={handleInputChange}
                            className='border rounded-md outline-none p-2'
                        />
                    </div>
                    <button
                        onClick={() => setToggle(!toggle)}
                        type='submit'
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    >
                        Submit Review
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddReview;
