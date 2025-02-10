import React from 'react'
import { CgUnavailable } from "react-icons/cg";
const NoProductAvailable = () => {
    return (
        <>
            <div className='flex flex-col items-center  p-20 max-w-5xl mx-auto justify-center text-center'>
                <CgUnavailable className='text-9xl text-blue-500' />
                <h4 className="text-lg font-semibold mb-2">
                    Oops! The product you're looking for is not available.
                </h4>
                <p className="text-gray-600">
                    We're sorry, but it seems like the product you are searching for is currently out of stock or not in our inventory.
                    Please check back later or explore our other amazing products.
                </p>
            </div>
        </>
    )
}

export default NoProductAvailable