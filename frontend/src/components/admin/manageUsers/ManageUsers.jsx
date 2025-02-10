import DashboardNavigation from '../../layout/DashboardNavigation';
import ManageUserTable from './ManageUserTable';
const ManageUsers = () => {
  return (
    <>
      <div className='bg-slate-900 pb-20 min-h-screen'>
        <DashboardNavigation />
        <div className='max-w-5xl mx-auto'>
          <div className='mx-5 mb-20'>
            <p className='text-white text-3xl font-bold mb-5'>Current users</p>
            <ManageUserTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
