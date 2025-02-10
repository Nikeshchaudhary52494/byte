import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleOrder } from '../../slices/orderSlice/orderSlice';
import SingleOrderDetails from '../layout/SingleOrderDetails';
import { STATUSES } from '../../store/statuses';
import Loader from '../layout/Loader/Loader';

const SingleOrder = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const { status } = useSelector((state) => state.orders);
    useEffect(() => {
        dispatch(getSingleOrder(id));
    }, [dispatch, id]);


    if (status === STATUSES.LOADING)
        return <Loader />

    return (
        <SingleOrderDetails />
    )
}

export default SingleOrder