import React from 'react'
import { Skeleton } from '../ui/skeleton'

const ProductsSkeletons = () => {
    return (
        <div
            className="flex mx-auto max-w-[80%] justify-center flex-wrap" >
            {
                [...Array(8)].map(() => (
                    <Skeleton className="m-4 h-[400px] w-[250px] rounded-sm" />
                ))
            }
        </div>
    )
}

export default ProductsSkeletons;
