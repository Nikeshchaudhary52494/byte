import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ locationState }) => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => {
                if (locationState)
                    navigate(locationState);
                else
                    navigate("/")
            }}
            className='text-white fixed z-20 top-10 left-5 hidden sm:block text-xl pl-5'><FaArrowLeft /></button>
    )
}

export default BackButton