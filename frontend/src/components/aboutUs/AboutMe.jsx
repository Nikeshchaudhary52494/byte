import React from "react";
import { Link } from "react-router-dom";
import ContactMe from "../layout/ContactMe";

const AboutMe = () => {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center p-10 text-center bg-secondary">
            <div className="flex flex-col items-center space-y-6">
                <h1 className="text-4xl font-bold">I am Nikesh Chaudhary</h1>
                <p className="text-lg">Developer of <span className="font-semibold text-[#39CCCC]">Byte Ecommerce</span></p>
                <Link
                    to="https://nikeshchaudhary.vercel.app/"
                    className="text-[#39CCCC] font-medium hover:underline transition-all duration-300"
                >
                    Visit my portfolio
                </Link>
                <p className="mb-3 text-xl font-semibold text-[#39CCCC]">Follow Me</p>
                <ContactMe />
            </div>
        </div>
    );
};

export default AboutMe;
