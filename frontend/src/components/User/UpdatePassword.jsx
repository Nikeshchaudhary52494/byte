import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetError, resetIspasswordUpdated, updatepassword } from '../../slices/userSlice/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackButton from '../layout/BackButton';
import { STATUSES } from '../../store/statuses';
import Loader from '../layout/Loader/Loader';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { error, isPasswordUpdated, status } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const passwordData = new FormData();
        passwordData.append("oldPassword", formData.oldPassword);
        passwordData.append("newPassword", formData.newPassword);
        passwordData.append("confirmPassword", formData.confirmPassword);
        dispatch(updatepassword(passwordData));
    };
    useEffect(() => {
        if (error) {
            toast.error(error.message);
            dispatch(resetError());
        }
        if (isPasswordUpdated) {
            toast.success("Password updated successfully");
            dispatch(resetIspasswordUpdated());
            navigate(location.state);
        }
    }, [dispatch, error, isPasswordUpdated, navigate, location.state]);

    if (status === STATUSES.LOADING)
        return <Loader />


    return (
        <div className='flex bg-slate-900 overflow-auto h-screen fixed z-10 top-0 left-0 w-screen justify-center items-center'>
            <BackButton locationState={location.state} />
            <div className="bg-slate-800 px-5 py-10 rounded-lg">
                <h3 className="text-xl mb-4 text-cyan-500 font-bold">Update Password</h3>
                <form className='flex gap-4 text-black flex-col' onSubmit={handleSubmit}>
                    <input
                        required
                        className='w-[300px] outline-none p-3 rounded-md'
                        type='password'
                        name='oldPassword'
                        placeholder='Old Password'
                        value={formData.oldPassword}
                        onChange={handleInputChange}
                    />

                    <input
                        required
                        className='w-[300px] outline-none p-3 rounded-md'
                        type='password'
                        name='newPassword'
                        placeholder='New Password'
                        value={formData.newPassword}
                        onChange={handleInputChange}
                    />

                    <input
                        required
                        className='w-[300px] outline-none p-3 rounded-md'
                        type='password'
                        name='confirmPassword'
                        placeholder='Confirm Password'
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />

                    <button
                        type='submit'
                        className='w-[300px] p-3 text-white font-bold active:bg-teal-700 bg-teal-600 rounded-lg'
                    >
                        Update Password
                    </button>
                </form></div>
        </div>
    );
};

export default UpdatePassword;
