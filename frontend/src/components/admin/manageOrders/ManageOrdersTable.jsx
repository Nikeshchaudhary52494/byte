import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTable } from 'react-table';
import { useNavigate } from 'react-router-dom';
import { MdDelete, MdEdit } from "react-icons/md";
import { deleteOrder, getAllOrders } from '../../../slices/orderSlice/orderSlice';
import { STATUSES } from '../../../store/statuses';
import TableSkeletons from '@/components/Skeletons/TableSkeletons';

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
                        className="mx-2 text-blue-500 hover:underline focus:outline-none"
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
            return <TableSkeletons />

        return (
            <div className="overflow-x-auto shadow-lg">
                <table {...getTableProps()} className="min-w-full border border-border">
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()} className="bg-secondary">
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()} className="px-4 py-2 border text-start">
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
                                <tr {...row.getRowProps()} className={`border-b ${rowClassName}`}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} className="px-4 py-2">
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
