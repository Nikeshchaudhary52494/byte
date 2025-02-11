import React from "react";
import Logo from "../../assets/byte.png"
import ContactMe from "./ContactMe";
import { Separator } from "../ui/separator";


const Footer = () => {
  return (
    <div className="w-full p-10 mt-40 space-y-4 bg-secondary">
      <div className="flex flex-col justify-between gap-10 md:flex-row">
        <div>
          <img src={Logo} alt="logo" className="w-20" />
          <p className="text-sm">nikeshchaudhary52494@gmail.com</p>
        </div>
        <div>
          <ContactMe />
        </div>
      </div>
      <Separator />
      <p className="text-sm text-secondary-foreground/50">Copyright 2023 &copy; MeNikeshChaudhary</p>
    </div>
  );
};

export default Footer;
