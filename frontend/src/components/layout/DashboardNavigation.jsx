import React from 'react'
import { NavLink } from 'react-router-dom'

const DashboardNavigation = () => {
    return (
        <nav className="flex justify-between max-w-5xl gap-2 px-5 pt-2 pb-10 mx-auto text-white">
            <NavLink to="/admin/manageuser" activeClassName="text-white" className="flex-grow p-2 text-center bg-green-500 ">
                Users
            </NavLink>
            <NavLink to="/admin/manageproduct" activeClassName="text-white" className="flex-grow p-2 text-center bg-orange-500 ">
                Products
            </NavLink>
            <NavLink to="/admin/manageorder" activeClassName="text-white" className="flex-grow p-2 text-center bg-violet-500">
                Orders
            </NavLink>
            <NavLink to="/admin/managereviews" activeClassName="text-white" className="flex-grow p-2 text-center bg-blue-800 ">
                Reviews
            </NavLink>
        </nav>
    )
}

export default DashboardNavigation