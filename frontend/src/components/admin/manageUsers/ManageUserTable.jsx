import React, { useEffect } from 'react';
import { SiTrustpilot } from "react-icons/si";
import { useDispatch, useSelector } from 'react-redux';
import { useTable } from 'react-table';
import { getAllUsers, updateUserRole } from '../../../slices/adminSlice/adminSlice';

const ManageUserTable = () => {
    const users = useSelector((state) => state.admin.usersData.users || []);
    const dispatch = useDispatch();
    const handleUpdateClick = (userId, role) => {
        dispatch(updateUserRole({ userId, role })).then(() => {
            dispatch(getAllUsers());
        })
    };
    useEffect(() => {
        if (users.length === 0)
            dispatch(getAllUsers());
    }, [dispatch, users]);
    const columns = [
        { Header: 'User ID', accessor: '_id' },
        { Header: 'Email', accessor: 'email' },
        { Header: 'Name', accessor: 'name' },
        { Header: 'Role', accessor: 'role' },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => {
                            const role = row.original.role === "admin" ? "user" : "admin";
                            handleUpdateClick(row.original._id, role);
                        }}
                        className="text-blue-500 hover:underline focus:outline-none mx-2"
                    >
                        <SiTrustpilot />
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
        } = useTable({ columns, data: users });

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
                            const isAdmin = row.values.role === 'admin';

                            return (
                                <tr
                                    {...row.getRowProps()}
                                    className={`border-b border-gray-200 ${isAdmin ? 'bg-green-200' : ''}`}
                                >
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

export default ManageUserTable;
