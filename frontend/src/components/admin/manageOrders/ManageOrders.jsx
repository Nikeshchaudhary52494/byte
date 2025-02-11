import DashboardNavigation from "../../layout/DashboardNavigation";
import ManageOrdersTable from "./ManageOrdersTable";
const ManageOrders = () => {
  return (
    <>
      <div className='min-h-screen pb-20'>
        <DashboardNavigation />
        <div className='max-w-5xl mx-auto'>
          <div className='mx-5 mb-20'>
            <p className='mb-5 text-3xl font-bold'>Available Orders</p>
            <ManageOrdersTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageOrders;
