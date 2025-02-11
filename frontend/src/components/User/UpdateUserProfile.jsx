import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import { STATUSES } from '../../store/statuses';
import { loadUser, resetError, resetIsProfileUpdated, updateUserProfile } from '../../slices/userSlice/userSlice';
import { toast } from "react-toastify";
import BackButton from '../layout/BackButton';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

const UpdateUserProfile = () => {
    const { user: data, status, isProfileUpdated, error } = useSelector((state) => state.user);
    const { email, name, avatar } = data;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState({
        name: "",
        email: "",
        avatar: null,
        oldAvatarUrl: "",
        oldAvatarPunlicId: ""
    });
    const [avatarPreview, setAvatarPreview] = useState("");
    useEffect(() => {
        if (!user) {
            dispatch(loadUser());
        }
        setUser({
            email,
            name,
            oldAvatarPunlicId: avatar?.public_id,
            oldAvatarUrl: avatar?.url,
        });
        setAvatarPreview(avatar?.url);
    }, [email, name, avatar, dispatch]);
    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setUser({ ...user, avatar: e.target.files[0] });
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('avatar', user.avatar);
        formData.append('oldAvatarUrl', user.oldAvatarUrl);
        formData.append('oldAvatarPublicId', user.oldAvatarPunlicId);
        dispatch(updateUserProfile(formData));
    };
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(resetError());
        }
        if (isProfileUpdated) {
            toast.success("Profile updated successfully");
            dispatch(resetIsProfileUpdated());
            navigate(location.state);
        }
    }, [error, isProfileUpdated, navigate, dispatch, location.state])


    if (status === STATUSES.LOADING)
        return <Loader />

    return (
        <div className='fixed inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-slate-50'>
            <BackButton locationState={location.state} />
            <Card>
                <CardHeader>
                    <CardTitle>
                        Edit Profile Details
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4 text-black" onSubmit={handleSubmit}>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            required
                            id="email"
                            className="w-[300px] outline-none p-3 rounded-md"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={user.email}
                            onChange={registerDataChange}
                        />
                        <Label htmlFor="name">Email</Label>
                        <Input
                            required
                            className="w-[300px] outline-none p-3 rounded-md"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            value={user.name}
                            onChange={registerDataChange}
                        />
                        <div className="flex items-center justify-between p-2 mx-2 border rounded-md bg-[#E7E6E9]">
                            <div className="overflow-hidden rounded-full w-14 h-14">
                                <img
                                    className="object-cover w-full h-full"
                                    src={avatarPreview}
                                    alt="Avatar"
                                />
                            </div>
                            <label
                                htmlFor="fileInput"
                                className="px-4 py-2 text-white bg-blue-500 rounded-md cursor-pointer"
                            >
                                <span className="hidden md:inline">Choose File</span>
                                <span className="md:hidden">Upload</span>
                            </label>
                            <input
                                id="fileInput"
                                className="hidden"
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={registerDataChange}
                            />
                        </div>
                        <Button type="submit">
                            Update
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default UpdateUserProfile;
