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
            className='fixed z-20 hidden pl-5 text-xl top-10 left-5 sm:block'><FaArrowLeft /></button>
    )
}

export default BackButton