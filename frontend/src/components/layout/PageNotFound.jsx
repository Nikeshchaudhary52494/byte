import React from 'react'
import { IoMdSettings } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className='fixed flex h-screen flex-col w-screen z-10 top-0 justify-center items-center bg-slate-900'>
                <h2 className='text-white flex font-bold text-9xl'>4<IoMdSettings className='text-cyan-500 spin' />4</h2>
                <p className='text-white font-bold'>Page Not Found</p>
                <button onClick={() => navigate("/")}
                    className='mt-10 rounded-full bg-cyan-500 py-2 px-4 text-white'>Go to home</button>
            </div>
        </>
    )
}

export default PageNotFound