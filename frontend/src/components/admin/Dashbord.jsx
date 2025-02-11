import React, { useEffect } from 'react'
import { IoMdCart } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import Messages from './Messages';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts, getAllUsers } from '../../slices/adminSlice/adminSlice';
import { getAllOrders } from '../../slices/orderSlice/orderSlice';
import { STATUSES } from '../../store/statuses';
import { getAllMessages } from '../../slices/contactUsSlice/contactUsSlice';
import { FaHome } from 'react-icons/fa';
import MetaData from '../layout/MetaData';
import DashboardNavigation from '../layout/DashboardNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import DashboardSkeleton from '../Skeletons/DashboardSkeleton';

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
    }, [dispatch]);

    return (
        <>
            <MetaData title={"Dashboard"} />
            <div className='absolute top-0 z-10 w-full h-full bg-secondary'>
                <FaHome onClick={() => navigate("/")} className='absolute text-3xl cursor-pointer left-5 top-5 ' />
                <div className='flex items-center justify-center gap-4 mt-10 text-2xl font-bold'>
                    <MdDashboard />
                    <h4>Dashboard</h4>
                </div>
                <DashboardNavigation />
                {
                    status === STATUSES.LOADING ?
                        <DashboardSkeleton /> :
                        <div className='max-w-5xl mx-auto'>
                            <Card className="mx-5 rounded-sm">
                                <CardHeader>
                                    <CardTitle className="text-center">Total Revenue</CardTitle>
                                </CardHeader>
                                <CardContent className="text-2xl font-bold text-center text-blue-500">
                                    ${data.totalAmount || 0}
                                </CardContent>
                            </Card>
                            <div className='grid grid-cols-1 gap-1 mx-5 mt-1 mb-10 rounded-sm md:grid-cols-2 '>
                                <Card className="flex items-center justify-center text-center rounded-sm h-28">
                                    <IoMdCart className="text-3xl" /> <span className="ml-2 font-bold">Total Orders: {ordersLength}</span>
                                </Card>
                                <Card className="flex items-center justify-center text-center rounded-sm h-28">
                                    <FaUser className="text-3xl" /> <span className="ml-2 font-bold">Total Users: {UserCount}</span>
                                </Card>
                                <div className='lg:col-span-3 md:col-span-2'>
                                    <Messages />
                                </div>
                            </div>
                        </div>
                }
            </div >
        </>
    )
}

export default Dashbord