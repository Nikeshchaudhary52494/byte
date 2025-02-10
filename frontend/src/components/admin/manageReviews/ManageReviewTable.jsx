import React from 'react'
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useTable } from 'react-table';
import { deleteProductReviews, getProductReviews } from '../../../slices/productSlice/productsSlice';

const ManageReviewTable = ({ productId }) => {
    const reviews = useSelector((state) => state.products.productreviewsData.reviews) || [];
    const dispatch = useDispatch();
    const handleDeleteClick = (reviewId) => {
        dispatch(deleteProductReviews({ productId, reviewId })).then(() => {
            dispatch(getProductReviews({ productId }));
        });
    };
    const columns = [
        { Header: "Review ID", accessor: "_id" },
        { Header: "Rating", accessor: "rating" },
        { Header: "Comment", accessor: "comment" },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleDeleteClick(row.original._id)}
                        className="text-red-500 hover:underline focus:outline-none mx-2"
                    ><MdDelete />
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
        } = useTable({ columns, data: reviews });
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
                            const rowClassName = row.original.ratind <= 1 ? 'bg-red-200' : '';
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
        )
    }
    return <MyTable />;
}


export default ManageReviewTable;