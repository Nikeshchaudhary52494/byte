import React from 'react'
import { Skeleton } from '../ui/skeleton'

const ProductDetailsSkeleton = () => {
    return (
        <div className='flex flex-col w-full h-full max-w-5xl gap-10 p-6 mx-auto md:flex-row'>
            <Skeleton className="md:w-[50%] w-full h-full max-h-96" />
            <div className='flex gap-5 md:w-[50%] w-full flex-col'>
                <Skeleton className="h-40" />
                <Skeleton className="h-40" />
                <Skeleton className="h-20" />
                <Skeleton className="h-20" />
            </div>
        </div>
    )
}

export default ProductDetailsSkeleton
