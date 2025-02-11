import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, getProductDetails, resetError, resetIsReviewAdded } from '../../../slices/productSlice/productsSlice';
import { toast } from 'react-toastify';
import { STATUSES } from '../../../store/statuses';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

const AddReview = ({ productId }) => {
    const dispatch = useDispatch();
    const { error, isReviewAdded, status } = useSelector((state) => state.products)

    const [review, setReview] = useState({
        comment: '',
        rating: 5,
    })
    const { comment, rating } = review;
    const handleInputChange = (e) => {
        if (e.target.name === 'rating') {
            let inputValue = parseInt(e.target.value, 10);
            inputValue = Math.min(Math.max(inputValue, 0), 5);
            setReview({ ...review, [e.target.name]: inputValue });
        }
        else if (e.target.name === 'comment') {
            setReview({ ...review, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ rating, comment, productId })
        dispatch(addReview({ rating, comment, productId }));

    };
    useEffect(() => {
        if (error) {
            toast.error("Error adding review");
            dispatch(resetError());
        }
        if (isReviewAdded) {
            dispatch(resetIsReviewAdded());
            dispatch(getProductDetails({ id: productId }));
        }
    }, [error, dispatch, isReviewAdded, productId]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Review</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Review</DialogTitle>
                    <DialogDescription>Add a product review</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md gap-2">
                    <Label htmlFor="comment">Comment</Label>
                    <Textarea
                        id="comment"
                        name="comment"
                        placeholder="Write review"
                        required
                        value={review.comment}
                        onChange={handleInputChange}
                    />

                    <Label htmlFor="rating">Rating</Label>
                    <Input
                        id="rating"
                        name="rating"
                        placeholder="rating"
                        required
                        type="number"
                        value={review.rating}
                        onChange={handleInputChange}
                    />

                    <Button type="submit">
                        {status === STATUSES.LOADING ? "Creating..." : "Add review"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddReview;
