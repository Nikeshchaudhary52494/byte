import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Slider } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { FaStar } from "react-icons/fa6";
import { fetchProducts2, setFilters } from '../../slices/productSlice/productsSlice';
const ProductFilter = ({ toggleFilter, setToggleFilter }) => {
    const minPriceValue = 300;
    const dispatch = useDispatch();

    const { categoryName, filters } = useSelector((state) => state.products);

    const [price, setPrice] = useState([filters?.price[0] || 0, filters?.price[1] || 2500]);
    const [itemCondition, setItemCondition] = useState(filters?.itemCondition || '');
    const [ratings, setRatings] = useState(filters?.ratings || 0);

    const handlePriceChange = (event, newPrice, activeThumb) => {
        if (!Array.isArray(newPrice)) {
            return;
        }
        if (activeThumb === 0) {
            setPrice([Math.min(newPrice[0], price[1] - minPriceValue), price[1]]);
        } else {
            setPrice([price[0], Math.max(newPrice[1], price[0] + minPriceValue)]);
        }
    };

    const handleItemConditionChange = (event) => {
        setItemCondition(event.target.value);
    };

    const handleCoustomerRatingsChange = (event) => {
        setRatings(Number(event.target.value));
    };
    const handelSubmit = () => {
        dispatch(setFilters({ price, ratings, itemCondition }))
        if (categoryName)
            dispatch(fetchProducts2({ price, ratings, itemCondition, categoryName }))
        else
            dispatch(fetchProducts2({ price, ratings, itemCondition }))
    }
    const handelReset = () => {
        setToggleFilter(!toggleFilter);
        dispatch(setFilters({ price: [0, 2500], ratings: 0, itemCondition: '' }));
        dispatch(fetchProducts2({ price: [0, 2500], ratings: 0, itemCondition: '', categoryName }));
    };
    return (
        <div className='flex px-2 items-center flex-col h-screen justify-center'>
            <div className='bg-slate-700 w-full text-white flex flex-col max-w-md rounded-lg p-10'>
                <p className='text-white'>Price:</p>
                <Slider
                    min={0}
                    max={2500}
                    value={price}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    disableSwap
                />
                <FormControl>
                    <p>Item condition</p>
                    <RadioGroup
                        aria-labelledby="itemConditionOptions"
                        name="itemsConditionOption"
                        value={itemCondition}
                        onChange={handleItemConditionChange} >
                        <FormControlLabel value="" control={<Radio />} label="Both" />
                        <FormControlLabel value="New" control={<Radio />} label="New" />
                        <FormControlLabel value="Renewed" control={<Radio />} label="Renewed" />
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <p>Coustomer ratings:</p>
                    <RadioGroup
                        aria-labelledby="itemConditionOptions"
                        name="itemsConditionOption"
                        value={ratings}
                        onChange={handleCoustomerRatingsChange}
                    >
                        <FormControlLabel value="4" control={<Radio />} label={<p className='flex items-center gap-1'><FaStar className='text-yellow-500' />4+</p>} />
                        <FormControlLabel value="3" control={<Radio />} label={<p className='flex items-center gap-1'><FaStar className='text-yellow-500' />3+</p>} />
                        <FormControlLabel value="2" control={<Radio />} label={<p className='flex items-center gap-1'><FaStar className='text-yellow-500' />2+</p>} />
                        <FormControlLabel value="0" control={<Radio />} label={<p className='flex items-center gap-1'><FaStar className='text-yellow-500' />any</p>} />
                    </RadioGroup>
                </FormControl>
                {/* Search Button */}
                <div className='flex gap-2 justify-between'>
                    <button onClick={() => { setToggleFilter(!toggleFilter); handelSubmit() }} className='bg-green-600 py-2 px-3 w-40 mt-10 rounded-md'>Search</button>
                    <button onClick={handelReset} className='bg-red-400 py-2 px-3 w-40 mt-10 rounded-md'>Reset</button>
                </div>
            </div>
        </div>
    );
};

export default ProductFilter;
