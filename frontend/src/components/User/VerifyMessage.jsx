import React from 'react'
import { MdVerifiedUser } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const VerifyMessage = () => {
    const navigate = useNavigate();
    return (
        <div className='fixed inset-0 max-h-full top-0 flex flex-col items-center  z-10 bg-slate-900 pt-40'>
            <MdVerifiedUser className='text-green-500 text-7xl' />
            <p className='text-white sm:font-semibold text-center sm:text-2xl text-xl px-20 mt-6'>
                A verification link has been sent to your registered email. Please check your inbox.
            </p>
            <button onClick={() => navigate("/")} className='sm:text-3xl text-xl text-blue-500 flex font-bold items-center mt-8'>
                Home
            </button>
        </div>

    )
}

export default VerifyMessage