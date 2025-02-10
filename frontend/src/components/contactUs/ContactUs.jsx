import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, resetError, resetIsMessageSend } from '../../slices/contactUsSlice/contactUsSlice';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { STATUSES } from '../../store/statuses';
import Loader from '../layout/Loader/Loader';
const ContactUs = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { isMessageSend, error, status } = useSelector((state) => state.contactUs);

    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createMessage({ message }));
    };
    useEffect(() => {
        if (isMessageSend) {
            toast.success("Message send");
            dispatch(resetIsMessageSend());
            navigate(location.state);
        }
        if (error) {
            toast.error(error);
            dispatch(resetError())
        }
    })

    if (status === STATUSES.LOADING)
        return <Loader />

    return (
        <div className='fixed inset-0 z-10 flex items-center justify-center bg-slate-900 text-white'>
            <div className='bg-slate-800 rounded-md p-5 w-[90%] max-w-md'>
                <h3 className="text-cyan-500 font-bold text-xl mb-4">Contact Us</h3>
                <form onSubmit={handleSubmit}>
                    <textarea
                        className='outline-none resize-none text-black rounded-sm p-2 my-2 w-full'
                        rows="5"
                        placeholder="Write your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <br />

                    {/* Submit button */}
                    <button className='bg-blue-500 p-2 rounded-md' type="submit">Submit</button>
                </form>
            </div>
        </div>

    );
}

export default ContactUs;
