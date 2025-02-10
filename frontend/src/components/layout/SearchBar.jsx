import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, setFilters } from '../../slices/productSlice/productsSlice';
import { Input } from '../ui/input';


const SearchBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        setKeyword("")
        dispatch(setFilters({ keyword, page: 1 }));
        dispatch(fetchProducts());
        navigate(`/products/${keyword}`);
    };

    return (

        <form className="flex justify-center w-full " onSubmit={searchSubmitHandler}>
            <Input
                value={keyword}
                className="w-3/4 h-10 pl-5 mx-auto bg-white rounded-md outline-none md:w-full "
                type="text"
                placeholder='Search product '
                onChange={(e) => setKeyword(e.target.value)} />
        </form>

    )
}

export default SearchBar;