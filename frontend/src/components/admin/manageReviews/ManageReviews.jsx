import React, { useState } from 'react';
import ManageReviewTable from './ManageReviewTable';
import { useDispatch } from 'react-redux';
import { getProductReviews } from '../../../slices/productSlice/productsSlice';
import DashboardNavigation from '../../layout/DashboardNavigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ManageReviews = () => {
  const [productId, setProductId] = useState('');
  const [toggle, setToggle] = useState(true);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getProductReviews({ productId })).then(() => {
      setToggle(!toggle);
    });
  };

  return (
    <>
      <div className='h-full bg-background'>
        <DashboardNavigation />
        <div className='flex flex-col items-center'>
          <p className='text-3xl font-bold'>View Reviews</p>
          <form
            className='flex flex-col my-10'
            onSubmit={handleSubmit}>
            <Input
              className='p-2 rounded-md outline-none'
              type="text"
              required
              placeholder="Enter Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
            <Button
              type="submit"
              className='bg-green-500 hover:bg-green-600 w-[100px] p-2 rounded mt-2'
            >
              View
            </Button>
          </form>
        </div>

        <div className={`mt-5 mb-20  max-w-5xl mx-auto  ${toggle ? 'hidden' : ''}`}>
          <ManageReviewTable productId={productId} />
        </div>
      </div>

    </>
  );
};

export default ManageReviews;
