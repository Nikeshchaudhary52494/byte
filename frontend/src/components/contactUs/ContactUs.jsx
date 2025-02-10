import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, resetError, resetIsMessageSend } from '../../slices/contactUsSlice/contactUsSlice';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { STATUSES } from '../../store/statuses';
import Loader from '../layout/Loader/Loader';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

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
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    Contact Us
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Contact Us
                    </DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>
                <Textarea
                    rows="5"
                    placeholder="Write your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Separator />
                <DialogFooter>
                    <Button
                        className="disabled:cursor-not-allowed"
                        disabled={message.trim().length < 10} onClick={handleSubmit}>
                        Send
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ContactUs;
