import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetError, resetIsVerified, verifyUser } from "../../slices/userSlice/userSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

const VerifyAccount = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams()

    const { isVerified, error } = useSelector((state) => state.user)
    useEffect(() => {
        if (isVerified) {
            navigate("/");
            dispatch(resetIsVerified());
            toast.success("User account verify");
        }
        if (error) {
            toast.error(error.message);
            dispatch(resetError());
            navigate("/")
        }
    }, [dispatch, navigate, error, token, isVerified])

    const handleVerification = () => {
        dispatch(verifyUser({ token }));
    };

    return (
        <>
            <div className="fixed inset-0 z-10 bg-slate-900 flex flex-col items-center justify-center text-white pb-20">
                <h3 className="text-2xl text-cyan-500 font-bold mb-4">Verify Your Account</h3>
                <p className="text-center mb-6 px-10 max-w-5xl">
                    Thank you for choosing Byte Ecommerce! To access the full range of features, please verify your account by clicking the button below.
                </p>
                <button onClick={handleVerification} className="bg-green-500 active:bg-green-600 py-2 px-4 rounded">
                    Verify
                </button>
            </div>
        </>
    )
}

export default VerifyAccount;