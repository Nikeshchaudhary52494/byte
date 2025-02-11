import React from 'react'
import { Skeleton } from '../ui/skeleton'

const ProductDetailsSkeleton = () => {
    return (
        <div className='flex w-full h-full max-w-5xl gap-10 p-6 mx-auto'>
            <Skeleton className="w-[50%] h-full" />
            <div className='flex gap-5 w-[50%] flex-col'>
                <Skeleton className="h-40" />
                <Skeleton className="h-40" />
                <Skeleton className="h-20" />
                <Skeleton className="h-20" />
            </div>
        </div>
    )
}

export default ProductDetailsSkeleton
