import React, { useEffect } from 'react'
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import { deleteMessageById, getAllMessages, resetIsMessageDeleted } from '../../slices/contactUsSlice/contactUsSlice';
import { toast } from 'react-toastify';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

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
        <Card className="rounded-sm">
            <CardHeader>
                <CardTitle>Messages</CardTitle>
            </CardHeader>
            <CardContent>
                {data.length > 0 ? (
                    data.map((msg) => (
                        <div key={msg._id} className="py-2 border-b">
                            <div className="flex items-center justify-between">
                                <p className="font-semibold">{msg.name}</p>
                                <Button size="sm" variant="outline" onClick={() => deleteMessage(msg._id)}>
                                    <MdDelete className='text-red-500' />
                                </Button>
                            </div>
                            <p className="text-xs text-gray-500">{msg.email}</p>
                            <p>{msg.message}</p>
                        </div>
                    ))
                ) : (
                    <p>No messages yet.</p>
                )}
            </CardContent>
        </Card>
    )
}

export default Messages