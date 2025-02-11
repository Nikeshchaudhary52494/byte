import { Outlet } from 'react-router-dom';
import Header from "./Header";
const Layout = () => {
    return (
        <div className='flex flex-col h-screen'>
            <div className='sticky top-0'>
                <Header />
            </div>
            <div className='flex-1'>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout