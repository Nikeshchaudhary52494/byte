import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loadUser, logoutUser } from "../../slices/userSlice/userSlice";
import Loader from "../layout/Loader/Loader";
import { STATUSES } from "../../store/statuses";
import { MdEdit, MdLogout } from "react-icons/md";
import { RiShoppingBagFill } from "react-icons/ri";
import BackButton from "../layout/BackButton";
import MetaData from "../layout/MetaData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

const UserProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { user, isAuthenticated, status } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    const fields = [
        { label: "Name", value: user?.name },
        { label: "Email", value: user?.email },
        { label: "Password", value: "*********" },
    ];

    if (status === STATUSES.LOADING) {
        return <Loader />;
    }

    if (!isAuthenticated) {
        navigate("/");
        return null;
    }

    return (
        <div className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-r from-green-600 via-slate-500 to-blue-500">
            <MetaData title="Profile" />
            <BackButton locationState={location.state} />
            {
                isAuthenticated ? (
                    <Card className="w-full h-full max-w-lg pt-10 rounded-none md:h-fit md:rounded-lg md:pt-0 bg-secondary">
                        <CardHeader>
                            <CardTitle className="text-3xl">
                                User Profile
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between p-2 my-2 rounded-md">
                                <Avatar className="w-24 h-24 m-2">
                                    <AvatarImage src={user?.avatar?.url} alt="User profile" />
                                    <AvatarFallback>
                                        <User size={28} />
                                    </AvatarFallback>
                                </Avatar>
                                <Link className="text-2xl" state={location.pathname} to="/user/updateprofile">
                                    <MdEdit />
                                </Link>
                            </div>

                            {fields.map((field, index) => (
                                <Card key={index} className="p-2 my-2">
                                    <p className="flex justify-between m-2 font-bold">
                                        {field.label}
                                        {field.label === "Password" && (
                                            <Link state={location.pathname} to="/user/updatepassword">
                                                <MdEdit className="text-xl" />
                                            </Link>
                                        )}
                                    </p>
                                    <p className="m-2">{field.value}</p>
                                </Card>
                            ))}
                            <div className="flex justify-between max-w-lg gap-10">
                                <Button onClick={() => navigate("/myorders")}>
                                    My Orders <RiShoppingBagFill />
                                </Button>
                                <Button
                                    onClick={() => {
                                        dispatch(logoutUser());
                                        localStorage.removeItem("shippingData");
                                        navigate("/");
                                    }}
                                    className="flex items-center gap-2 text-red-500 bg-red-500/50 hover:text-white hover:bg-red-600"
                                >
                                    Logout <MdLogout />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    navigate("/")
                )}
        </div>
    );
};

export default UserProfile;
