import DashboardNavigation from '../../layout/DashboardNavigation';
import ManageUserTable from './ManageUserTable';
const ManageUsers = () => {
  return (
    <>
      <div className='h-full'>
        <DashboardNavigation />
        <div className='max-w-5xl mx-auto'>
          <div className='mx-5 mb-20'>
            <p className='mb-5 text-3xl font-bold'>Current users</p>
            <ManageUserTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
