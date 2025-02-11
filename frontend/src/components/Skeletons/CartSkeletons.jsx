import React from 'react'
import { Skeleton } from '../ui/skeleton'

const CartSkeletons = () => {
    return (
        <div className='flex flex-col items-center justify-center w-full h-full max-w-6xl gap-5 mx-auto'>
            <div className='flex w-full gap-2 '>
                <Skeleton className="rounded-sm h-28 w-28" />
                <Skeleton className="w-full rounded-sm h-28" />
            </div>
            <div className='flex w-full gap-2 '>
                <Skeleton className="rounded-sm h-28 w-28" />
                <Skeleton className="w-full rounded-sm h-28" />
            </div>
        </div>
    )
}

export default CartSkeletons;
