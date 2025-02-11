import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import demoAvatar from "../../assets/userProfile.avif"
import Logo from "../../assets/byte.png"
import { registerUser, resetError, resetIsEmailSend } from '../../slices/userSlice/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../layout/Loader/Loader'
import { STATUSES } from '../../store/statuses'
import MetaData from '../layout/MetaData'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'


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
            <div className='fixed inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-r from-green-600 via-slate-500 to-blue-500'>
                <Card className="w-[380px] h-full md:h-fit rounded-none md:rounded-lg pt-10 md:pt-0">
                    <CardHeader>
                        <img className="w-24" src={Logo} alt="Byte logo" />
                        <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
                        <CardDescription>Continue account creation</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            className="flex flex-col gap-4 text-black"
                            onSubmit={handleSubmit}
                        >
                            <Label htmlFor='name'>Name</Label>
                            <Input
                                id="name"
                                required
                                className="w-[300px] outline-none p-2 m-2 rounded-md"
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={user.name}
                                onChange={registerDataChange}
                            />

                            <Label htmlFor='email'>Email</Label>
                            <Input
                                id="email"
                                required
                                className="w-[300px] outline-none p-2 m-2 rounded-md"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={user.email}
                                onChange={registerDataChange}
                            />
                            <Label htmlFor='password'>Password</Label>
                            <Input
                                id="Password"
                                required
                                className="w-[300px] outline-none p-2 m-2 rounded-md"
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={user.password}
                                onChange={registerDataChange}
                            />
                            <Label htmlFor="fileInput">User Avatar</Label>
                            <div className="flex items-center justify-between p-2 mx-2 border rounded-md bg-[#E7E6E9]">
                                <Avatar className="m-2 h-14 w-14">
                                    <AvatarImage src={avatarPreview} alt="User profile" />
                                </Avatar>
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
                            <Button type="submit">Sign up</Button>
                        </form>
                        <Link to="/user/login">
                            <p className="text-sm">Already a user? Login</p>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

export default SignUp