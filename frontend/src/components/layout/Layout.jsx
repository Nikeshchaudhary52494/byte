import { Outlet } from 'react-router-dom';
import Header from "./Header";
const Layout = () => {
    return (
        <div className='flex flex-col h-screen'>
            <Header />
            <div className='flex-1 overflow-y-auto'>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout