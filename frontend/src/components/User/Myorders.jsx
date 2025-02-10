import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTable } from 'react-table';
import { myOrders } from '../../slices/orderSlice/orderSlice';
import { FaList } from 'react-icons/fa';
import { STATUSES } from '../../store/statuses';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';

const Myorders = () => {
    const { myOrders: data, status } = useSelector((state) => state.orders);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleViewDetails = (orderId) => {
        navigate(`/order/${orderId}`);
    };

    useEffect(() => {
        dispatch(myOrders());
    }, [dispatch]);

    const columns = [
        { Header: 'Order ID', accessor: '_id' },
        { Header: 'Status', accessor: 'orderStatus' },
        { Header: 'Total Price', accessor: 'totalPrice' },
        {
            Header: 'Details',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleViewDetails(row.original._id)}
                        className="text-blue-500 hover:underline focus:outline-none mx-2"
                    >
                        <FaList />
                    </button>
                </div>
            ),
        },
    ];
    function MyTable() {
        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
        } = useTable({ columns, data });

        if (status === STATUSES.LOADING)
            return <Loader />

        return (
            <>
                <MetaData title={"MyOrders"} />
                <div className="sm:px-20 px-5 pb-20 min-h-screen bg-slate-900">
                    <h3 className='text-white font-bold text-3xl py-5'>My Orders</h3>
                    <div className='overflow-x-auto'>
                        <table {...getTableProps()} className="min-w-full bg-white border border-gray-200">
                            <thead>
                                {headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100">
                                        {headerGroup.headers.map(column => (
                                            <th {...column.getHeaderProps()} className="py-2 px-4 border-b border-gray-200 text-start">
                                                {column.render('Header')}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map(row => {
                                    prepareRow(row);
                                    const rowClassName = row.original.orderStatus === 'Delivered' ? 'bg-green-200' : '';
                                    return (
                                        <tr {...row.getRowProps()} className={`border-b border-gray-200 ${rowClassName}`}>
                                            {row.cells.map(cell => (
                                                <td {...cell.getCellProps()} className="py-2 px-4">
                                                    {cell.render('Cell')}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
    return <MyTable />;
}

export default Myorders