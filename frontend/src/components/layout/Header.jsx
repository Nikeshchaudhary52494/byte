import React, { useEffect, useState } from "react";
import NavOptions from "./NavOptions.jsx";
import SearchBar from "./SearchBar.jsx"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Logo from "../../assets/byte.png"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  AiOutlineMenu,
} from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import ContactUs from "../contactUs/ContactUs.jsx";
const Header = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.user)

  return (
    <nav className="bg-slate-200">
      <div className="w-3/4 mx-auto lg:w-full">
        <div className="flex items-center justify-between max-w-5xl p-4 mx-auto ">
          <img onClick={() => navigate("/")} className="w-24 mr-2 cursor-pointer" src={Logo} alt="BYTE" />
          <div className="hidden md:block">
            <SearchBar />
          </div>

          {/* signin button */}
          <div className="flex items-center gap-10">
            {

              isAuthenticated ? (
                <div onClick={() => navigate("/user/profile", { state: location.pathname })} className='w-10 h-10 overflow-hidden rounded-full cursor-pointer'>
                  <img
                    className='object-cover w-full h-full' src={user.avatar.url}
                    alt="user profile" />
                </div>
              ) : (
                <Link to="/user/login" state={location.pathname}>
                  <div className="flex items-center h-10 text-xl cursor-pointer">
                    <FaUser className="text-sm" />
                    <span className="text-xs xs:text-base">Login</span>
                  </div>
                </Link>
              )
            }

            <Sheet>
              <SheetTrigger>
                <AiOutlineMenu className="text-2xl transition-transform duration-200 cursor-pointer lg:hidden hover:scale-110" />
              </SheetTrigger>
              <SheetContent className="p-6 bg-[#E2E8F0]">
                <ul className="flex flex-col gap-10 mt-10 text-2xl font-semibold text-black">
                  <NavOptions />
                </ul>
              </SheetContent>
            </Sheet>
          </div>

          {/* Navigation bar for Larger screen */}
          <ul className="hidden gap-5 lg:flex">
            <NavOptions />
            <ContactUs />
          </ul>

        </div>
      </div>
      <div className="pb-4 md:hidden ">
        <SearchBar />
      </div>

    </nav >
  );
};

export default Header;
