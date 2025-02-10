import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable } from 'react-table';
import { useNavigate } from 'react-router-dom';
import { MdDelete, MdEdit } from "react-icons/md";
import { deleteOrder, getAllOrders } from '../../../slices/orderSlice/orderSlice';
import Loader from '../../layout/Loader/Loader';
import { STATUSES } from '../../../store/statuses';

const ManageOrdersTable = () => {
    let { data, status } = useSelector((state) => state.orders);
    data = data.orders;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleEditClick = (orderId) => {
        navigate(`/admin/order/${orderId}`);
    };

    const handleDeleteClick = (orderId) => {
        dispatch(deleteOrder(orderId)).then(() => {
            dispatch(getAllOrders());
        });
    };

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    const columns = [
        { Header: 'Order ID', accessor: '_id' },
        { Header: 'Status', accessor: 'orderStatus' },
        { Header: 'Total Price', accessor: 'totalPrice' },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleEditClick(row.original._id)}
                        className="text-blue-500 hover:underline focus:outline-none mx-2"
                    >
                        <MdEdit />
                    </button>
                    <button
                        onClick={() => handleDeleteClick(row.original._id)}
                        className="text-red-500 hover:underline focus:outline-none"
                    >
                        <MdDelete />
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
            <div className="overflow-x-auto">
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
        );
    }

    return <MyTable />;
}

export default ManageOrdersTable;
