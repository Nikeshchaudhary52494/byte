import { Link } from "react-router-dom";
import {
    AiOutlineInstagram,
    AiOutlineLinkedin,
} from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";

const ContactMe = () => {
    return (
        <div className="flex gap-5 text-3xl">
            <Link
                className="flex items-center p-2 rounded-full 
             bg-[#39CCCC]"
                to="https://www.instagram.com/nikeshchaudhary52494/">
                <AiOutlineInstagram />
            </Link>
            <Link
                className="flex items-center p-2 rounded-full  
            bg-[#39CCCC]"
                to="https://www.linkedin.com/in/nikeshchaudhary52494/">
                <AiOutlineLinkedin />
            </Link>
            <Link
                className="flex items-center p-2 rounded-full  bg-[#39CCCC]"
                to="https://twitter.com/nikesh_003">
                <FaXTwitter />
            </Link>
        </div>
    )
}

export default ContactMe