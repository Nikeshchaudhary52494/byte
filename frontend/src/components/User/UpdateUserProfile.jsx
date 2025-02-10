import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import { STATUSES } from '../../store/statuses';
import { loadUser, resetError, resetIsProfileUpdated, updateUserProfile } from '../../slices/userSlice/userSlice';
import { toast } from "react-toastify";
import BackButton from '../layout/BackButton';

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
        <div className='flex bg-slate-900 overflow-auto h-screen fixed z-10 top-0 left-0 w-screen justify-center items-center'>
            <BackButton locationState={location.state} />
            <div className="bg-slate-800 px-5 py-10 rounded-lg text-white">
                <h3 className="text-xl mb-4 text-cyan-500 font-bold">Edit Profile Details</h3>
                <form className="flex gap-4 text-black flex-col" onSubmit={handleSubmit}>
                    <input
                        required
                        className="w-[300px] outline-none p-3 rounded-md"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={registerDataChange}
                    />
                    <input
                        required
                        className="w-[300px] outline-none p-3 rounded-md"
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={user.name}
                        onChange={registerDataChange}
                    />
                    <div className='flex justify-between border rounded-md bg-slate-700 p-2 items-center'>

                        <div className='w-14 h-14 rounded-full overflow-hidden'>
                            <img className='object-cover w-full h-full'
                                src={avatarPreview}
                                alt="Avatar" />
                        </div>
                        <label for="fileInput" class="cursor-pointer bg-blue-500 
text-white py-2 px-4  rounded-md">
                            <span class="hidden md:inline">Choose File</span>
                            <span class="md:hidden">Upload</span>
                        </label>
                        <input
                            id='fileInput'
                            className='hidden '
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={registerDataChange} />
                    </div>
                    <motion.input
                        type="submit"
                        value="Update"
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        className="w-[300px] text-white font-bold p-3 hover:bg-teal-700 bg-teal-600 rounded-lg"
                    />
                </form>
            </div>
        </div>
    );
};

export default UpdateUserProfile;
