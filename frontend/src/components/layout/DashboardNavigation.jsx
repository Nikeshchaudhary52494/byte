import React from 'react'
import { NavLink } from 'react-router-dom'

const DashboardNavigation = () => {
    return (
        <nav className="pb-10 px-5 mx-auto pt-2 flex max-w-5xl gap-2 text-white justify-between">
            <NavLink to="/admin/manageuser" activeClassName="text-white" className="p-2 bg-green-500 text-center flex-grow ">
                Users
            </NavLink>
            <NavLink to="/admin/manageproduct" activeClassName="text-white" className=" bg-orange-500 p-2 text-center flex-grow ">
                Products
            </NavLink>
            <NavLink to="/admin/manageorder" activeClassName="text-white" className=" bg-violet-500 p-2 text-center flex-grow ">
                Orders
            </NavLink>
            <NavLink to="/admin/managereviews" activeClassName="text-white" className=" bg-blue-800 p-2 text-center flex-grow ">
                Reviews
            </NavLink>
        </nav>
    )
}

export default DashboardNavigation