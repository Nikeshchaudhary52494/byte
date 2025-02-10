import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loadUser, logoutUser } from '../../slices/userSlice/userSlice';
import Loader from '../layout/Loader/Loader';
import { STATUSES } from '../../store/statuses';
import { MdEdit, MdLogout } from 'react-icons/md';
import { RiShoppingBagFill } from "react-icons/ri";
import BackButton from '../layout/BackButton';
import MetaData from '../layout/MetaData';

const UserProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { user, isAuthenticated, status } = useSelector((state) => state.user)
    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    const fields = [
        { label: 'Name', value: user.name },
        { label: 'Email', value: user.email },
        { label: 'Password', value: '*********' },
    ];

    if (status === STATUSES.LOADING) {
        return (
            <div >
                <Loader />
            </div>
        )
    }

    return (
        <div>
            <>
                <MetaData title={"Profile"} />
                {isAuthenticated ? (
                    <div className='flex justify-center fixed inset-0 z-10  flex-col-reverse items-center bg-slate-900 h-screen'>
                        <div className='w-[80%] max-w-lg bg-slate-800 p-2 rounded-lg'>
                            <div className=' rounded-md flex justify-between items-center bg-slate-700 my-2 p-2'>
                                <div className='w-24 h-24 rounded-full m-2 overflow-hidden'>
                                    <img className='w-full h-full object-cover' src={user.avatar.url} alt="user profile" />
                                </div>
                                <Link className='text-white text-2xl'
                                    state={location.pathname}
                                    to="/user/updateprofile">
                                    <MdEdit />
                                </Link>
                            </div>
                            {fields.map((field, index) => (
                                <div key={index} className=' bg-slate-700 text-white rounded-md my-2 p-2'>
                                    <p className='m-2 flex justify-between font-bold '>{field.label} <Link state={location.pathname} to="/user/updatepassword"> <MdEdit className={`${field.label === "Password" ? `text-xl` : `hidden`}`} /></Link></p>
                                    <div className='flex justify-between items-center'>
                                        <p className='m-2'>{field.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className=' w-[80%] flex justify-between flex-row-reverse gap-10 max-w-lg '>
                            <button onClick={() => {
                                dispatch(logoutUser());
                                localStorage.removeItem('shippingData');
                                navigate("/");
                            }}
                                className='flex items-center my-2 gap-2 p-2 bg-red-400 rounded-md'>Logout <MdLogout /></button>
                            <button
                                className='flex items-center  my-2 gap-2 p-2 bg-green-400 rounded-md'
                                onClick={() => navigate("/myorders")}
                            >My orders <RiShoppingBagFill /></button>
                        </div>
                        <BackButton locationState={location.state} />
                    </div>
                ) : (
                    navigate("/")
                )}
            </>
        </div>
    )
}

export default UserProfile


