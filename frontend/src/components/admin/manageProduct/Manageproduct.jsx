import React from 'react'
import { useNavigate } from 'react-router-dom'
import ManageProductTable from './ManageProductTable';
import DashboardNavigation from '../../layout/DashboardNavigation';
import { Button } from '@/components/ui/button';

const Manageproduct = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className='h-full'>
        <DashboardNavigation />
        <div className='max-w-5xl mx-auto mb-20'>
          <Button
            onClick={() => navigate('/admin/manageproduct/addproduct')}
            className='p-2 mx-5 my-5 bg-green-400 rounded-md hover:bg-green-500'>Add new Product</Button>
          <div className='mx-5'>
            <p className='mb-5 text-3xl font-bold'>Available products</p>
            <ManageProductTable />
          </div>
        </div>
      </div>

    </>
  )
}

export default Manageproduct