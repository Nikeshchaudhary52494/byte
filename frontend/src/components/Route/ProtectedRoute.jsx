import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ Component, adminOnly }) => {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const isAdmin = user.role === "admin";
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/user/login");
        } else if (adminOnly && !isAdmin) {
            navigate("/");
        }
    }, [isAuthenticated, user.role, adminOnly, isAdmin, navigate]);

    return <Component />;
};

export default ProtectedRoute;
