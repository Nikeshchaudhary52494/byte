import React, { useEffect } from 'react'
import { IoMdCart } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom'
import Messages from './Messages';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts, getAllUsers } from '../../slices/adminSlice/adminSlice';
import { getAllOrders } from '../../slices/orderSlice/orderSlice';
import { STATUSES } from '../../store/statuses';
import Loader from '../layout/Loader/Loader';
import { getAllMessages } from '../../slices/contactUsSlice/contactUsSlice';
import { MdRateReview } from "react-icons/md";
import { FaHome } from 'react-icons/fa';
import MetaData from '../layout/MetaData';

const Dashbord = () => {
    const navigate = useNavigate();

    const { UserCount } = useSelector((state) => state.admin.usersData);
    const { data, status } = useSelector((state) => state.orders);
    const ordersLength = data?.orders?.length || 0;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllUsers());
        dispatch(getAdminProducts());
        dispatch(getAllOrders());
        dispatch(getAllMessages());
    }, [dispatch])

    if (status === STATUSES.LOADING) {
        return <div class="w-full grid place-content-center h-screen ">
            <Loader />
        </div>
    }
    return (
        <>
            <MetaData title={"Dashboard"} />
            <div className='bg-slate-800 w-screen min-h-screen absolute top-0 z-10 py-20'>
                <FaHome onClick={() => navigate("/")} className='text-white cursor-pointer absolute left-5 top-5 text-3xl ' />
                <div className='text-2xl flex gap-4  items-center justify-center text-white font-bold mt-10'>
                    <MdDashboard />
                    <h4>Dashboard</h4>
                </div>
                <div className='mx-auto max-w-5xl'>
                    <div className='bg-blue-500 mx-5 p-5 rounded-sm mt-10 text-center text-white font-bold'>
                        TotalAmount: {data.totalAmount}
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-1 mb-10 mx-5 text-white rounded-sm  gap-1 '>
                        <Link to="/admin/manageproduct" className='bg-orange-500 p-2 rounded-sm text-center text-white font-bold'>
                            Manage Product
                        </Link>
                        <Link to="/admin/manageuser" className='bg-green-600 p-2 rounded-sm text-center text-white font-bold'>
                            Manage Users
                        </Link>
                        <Link to="/admin/manageorder" className='bg-violet-700 p-2 rounded-sm text-center text-white font-bold'>
                            Manage Order
                        </Link>
                        <Link to="/admin/managereviews" className='h-28 flex-grow rounded-sm text-3xl justify-center flex items-center bg-blue-800 text-white font-bold'>
                            <MdRateReview /> Review
                        </Link>
                        <div className='h-28 flex-grow rounded-sm flex items-center text-3xl font-bold justify-center bg-violet-500'>
                            <IoMdCart /> Total order : {ordersLength}
                        </div>
                        <div className='h-28 flex-grow rounded-sm flex items-center text-3xl font-bold justify-center bg-fuchsia-500'>
                            <FaUser />
                            Total user : {UserCount}
                        </div >
                        <div className='lg:col-span-3 md:col-span-2'>
                            <Messages />
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Dashbord