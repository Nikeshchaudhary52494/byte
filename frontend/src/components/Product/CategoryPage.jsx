import React from 'react'
import CategoriesList from './CategoriesList'
import MetaData from '../layout/MetaData'

const CategoryPage = () => {
    return (
        <>
            <MetaData title={"Categories"} />
            <div className='flex flex-wrap px-5 justify-center mt-10 gap-2'>
                <CategoriesList />
            </div>
        </>
    )
}

export default CategoryPage