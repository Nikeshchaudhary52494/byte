import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetError, resetIspasswordUpdated, updatepassword } from '../../slices/userSlice/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackButton from '../layout/BackButton';
import { STATUSES } from '../../store/statuses';
import Loader from '../layout/Loader/Loader';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

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
        <div className='fixed inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-slate-50'>
            <BackButton locationState={location.state} />
            <Card>
                <CardHeader>
                    <CardTitle>
                        Update Password
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className='flex flex-col gap-4 text-black' onSubmit={handleSubmit}>
                        <Label htmlfor="oldpassword">Old Password</Label>
                        <Input
                            required
                            className='w-[300px] outline-none p-3 rounded-md'
                            type='password'
                            id="oldpassword"
                            name='oldPassword'
                            placeholder='Old Password'
                            value={formData.oldPassword}
                            onChange={handleInputChange}
                        />
                        <Label htmlfor="newPassword">New Password</Label>
                        <Input
                            required
                            className='w-[300px] outline-none p-3 rounded-md'
                            type='password'
                            name='newPassword'
                            id="newPassword"
                            placeholder='New Password'
                            value={formData.newPassword}
                            onChange={handleInputChange}
                        />
                        <Label htmlfor="confirmPassword">Confirm Password</Label>
                        <Input
                            required
                            className='w-[300px] outline-none p-3 rounded-md'
                            type='password'
                            id="confirmPassword"
                            name='confirmPassword'
                            placeholder='Confirm Password'
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />

                        <Button type='submit'>
                            Update Password
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default UpdatePassword;
