import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../slices/userSlice/userSlice';


const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const dispatch = useDispatch();
    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            return;
        }
        const passwordData = new FormData();
        passwordData.append("password", newPassword);
        passwordData.append("confirmPassword", confirmNewPassword);
        dispatch(resetPassword({ token, passwordData })).then(() => {
            navigate("/user/login");
        })
    }

    return (
        <div className='p-10 bg-slate-900 min-h-screen'>
            <div className='flex flex-col items-center'>
                <p className='font-bold text-3xl text-white'>Reset Password</p>
                <form
                    className='flex flex-col my-10'
                    onSubmit={handleSubmit}>
                    <input
                        className='p-2 rounded-md  outline-none mt-2'
                        type="password"
                        required
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        className='p-2 rounded-md  outline-none mt-2'
                        type="password"
                        required
                        placeholder="Confirm New Password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className='bg-green-500 font-bold w-36 text-white p-2 rounded mt-2'
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword;
