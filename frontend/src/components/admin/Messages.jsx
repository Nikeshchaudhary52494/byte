import React, { useEffect } from 'react'
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { deleteMessageById, getAllMessages, resetIsMessageDeleted } from '../../slices/contactUsSlice/contactUsSlice';
import { toast } from 'react-toastify';

const Messages = () => {
    const { data, isMessageDeleted } = useSelector((state) => state.contactUs);
    const dispatch = useDispatch();
    const deleteMessage = (messageId) => {
        dispatch(deleteMessageById({ messageId }));
    };
    useEffect(() => {
        if (isMessageDeleted) {
            toast.success("Message deleted");
            dispatch(resetIsMessageDeleted());
            dispatch(getAllMessages());
        }
    })
    return (
        <>
            <div className='bg-slate-600 border p-4 rounded-sm'>
                <div><p className='text-lg m-1 mb-4'>Messages</p></div>
                <div>
                    {
                        data.map((messsage) => (
                            <div className='mb-2 bg-slate-500 p-2 text-sm rounded-sm'>
                                <div className='flex justify-between'> <p className='font-bold text-cyan-500'>{messsage.name}  </p><button className='text-red-500 text-xl' onClick={() => deleteMessage(messsage._id)}><MdDelete /></button></div>
                                <p className='text-xs'>{messsage.email}</p>
                                <p>{messsage.message}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Messages