import React, { useEffect, useState } from "react";
import NavOptions from "./NavOptions.jsx";
import SearchBar from "./SearchBar.jsx"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Logo from "../../assets/byte.png"
import {
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { FaUser } from "react-icons/fa";
const Header = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.user)
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const handleScroll = (event) => {
      if (toggle) {
        event.preventDefault();
      }
    };
    document.body.addEventListener("wheel", handleScroll, { passive: false });
    return () => {
      document.body.removeEventListener("wheel", handleScroll);
    };
  }, [toggle]);

  return (
    <>
      <nav className="bg-slate-200 dark:bg-slate-800 dark:text-white sticky  top-0 z-10">
        <div className="lg:w-full w-3/4 mx-auto">
          <div className="max-w-5xl p-4 mx-auto flex justify-between items-center ">
            <img onClick={() => navigate("/")} className="w-24 cursor-pointer mr-2" src={Logo} alt="BYTE" />
            <div className=" hidden md:block ">
              <SearchBar />
            </div>

            {/* signin button */}
            <div className="flex gap-10 items-center">
              {

                isAuthenticated ? (
                  <div onClick={() => navigate("/user/profile", { state: location.pathname })} className='w-10 cursor-pointer h-10 rounded-full overflow-hidden'>
                    <img
                      className='w-full h-full object-cover' src={user.avatar.url}
                      alt="user profile" />
                  </div>
                ) : (
                  <Link to="/user/login" state={location.pathname}>
                    <div className="flex items-center text-xl  h-10 cursor-pointer">
                      <FaUser className="text-sm" />
                      <span className="xs:text-base text-xs">Login</span>
                    </div>
                  </Link>
                )
              }

              <AiOutlineMenu
                onClick={() => setToggle(!toggle)}
                className="text-2xl lg:hidden  cursor-pointer"
              />
            </div>

            {/* Navigation bar for Larger screen */}
            <ul className=" hidden lg:flex gap-5 ">
              <NavOptions />
            </ul>

            {/* SideBar(Navigation) for Small screen */}

            <div className={`inset-0 fixed bg-black backdrop-filter bg-opacity-50 backdrop-blur-md ${toggle ? `block` : `hidden`}`}>
              <ul
                className={` lg:hidden flex flex-col gap-7 w-[270px] h-[300px] rounded-[20px] pl-4 pt-10 fixed bg-cyan-500 dark:bg-slate-800 text-white dark:text-slate-300 top-4 right-4 
          ${toggle ? `right-4 top-4` : `right-[-100%] top-[-100%]`}
          `}
              >
                <AiOutlineClose
                  onClick={() => setToggle(!toggle)}
                  className="text-2xl fixed right-[50px]"
                />
                <NavOptions toggle={toggle} setToggle={setToggle} />
              </ul>
            </div>
          </div>
        </div>
        <div className="md:hidden  pb-4 ">
          <SearchBar />
        </div>

      </nav >

    </>
  );
};

export default Header;
