import React from "react";
import Logo from "../../assets/byte.png"
import ContactMe from "./ContactMe";


const Footer = () => {
  return (
    <div className="mt-40 bg-slate-800">
      <div className="flex max-w-5xl p-10 mx-auto justify-between items-center text-white md:flex-row flex-col gap-10 text-center">
        <div className="flex flex-col items-center md:w-[70%]">
          <img className="w-40" src={Logo} alt="Byte Logo" />
          <h1 className="text-4xl font-bold m-2">ECOMMERCE</h1>
          <p className="italic text-cyan-500 mb-2">Elevating your e-commerce experience with modern interactivity, showcasing how small changes can create a big impact on your lifestyle</p>
          <p>Copyright 2023 &copy; MeNikeshChaudhary</p>
        </div>
        <ContactMe />
      </div>
    </div>
  );
};

export default Footer;
