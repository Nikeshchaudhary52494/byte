import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { Link, useLocation, useNavigate } from "react-router-dom"
import demoAvatar from "../../assets/userProfile.avif"
import Logo from "../../assets/byte.png"
import { registerUser, resetError, resetIsEmailSend } from '../../slices/userSlice/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../layout/Loader/Loader'
import { STATUSES } from '../../store/statuses'
import MetaData from '../layout/MetaData'


const SignUp = () => {
    const { isEmailSend, isAuthenticated, error, status } = useSelector((state) => state.user)
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        avatar: null,
    });
    const [avatarPreview, setAvatarPreview] = useState(demoAvatar);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.avatar === null) {
            toast.error('Please choose a user profile');
        }
        else {
            const formData = new FormData();
            formData.append('name', user.name);
            formData.append('email', user.email);
            formData.append('password', user.password);
            formData.append('image', user.avatar);
            dispatch(registerUser(formData));
        }
    };

    const registerDataChange = (e) => {
        if (e.target.name === "image") {
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

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
        if (isEmailSend) {
            toast.success("verification link send");
            dispatch(resetIsEmailSend());
            navigate("/user/verifymessage");
        }
        if (error) {
            toast.error(error);
            dispatch(resetError());
        }
    }, [navigate, isAuthenticated, location, error, isEmailSend, dispatch])

    if (status === STATUSES.LOADING)
        return <Loader />

    return (
        <>
            <MetaData title={"SignUp"} />
            <div className="bg-slate-900 flex flex-col items-center justify-center inset-0 z-10 fixed">
                <div className="bg-slate-800 px-5 py-10 rounded-lg text-white">
                    <div className="px-4" >
                        <img className='w-24' src={Logo} alt="Byte logo" />
                        <h3 className="text-xl mb-4 ">Sign UP</h3>
                    </div>
                    <form
                        className="flex gap-4 text-black flex-col"
                        onSubmit={handleSubmit} >
                        <input
                            required
                            className="w-[300px ] outline-none p-2 m-2 rounded-md"
                            type="text"
                            name='name'
                            placeholder='Name'
                            value={user.name}
                            onChange={registerDataChange} />

                        <input
                            required
                            className="w-[300px ] outline-none p-2 m-2 rounded-md"
                            type="email"
                            name='email'
                            placeholder='Email'
                            value={user.email}
                            onChange={registerDataChange} />

                        <input
                            required
                            className="w-[300px ] outline-none p-2 m-2 rounded-md"
                            type="password"
                            name='password'
                            placeholder='Password'
                            value={user.password}
                            onChange={registerDataChange} />
                        <div className='flex justify-between border rounded-md bg-slate-700 mx-2 p-2 items-center'>

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
                                name="image"
                                accept="image/*"
                                onChange={registerDataChange} />
                        </div>
                        <motion.input
                            type="submit"
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: .5 }}
                            className="w-[300px] m-2 h-[40px] hover:bg-teal-700 bg-teal-600 rounded-lg" />
                    </form>
                    <Link to="/user/login">
                        <p className="text-sm ">
                            Already a user? Login
                        </p>
                    </Link>
                </div >
                <div className='w-full max-w-sm px-4'>
                    <Link to="/" >
                        <button class="text-white  p-2 mt-5"  >Go to Home</button>
                    </Link>
                </div>
            </div >
        </>
    )
}

export default SignUp