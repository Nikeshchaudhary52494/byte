import { Link } from "react-router-dom";
import {
    AiOutlineInstagram,
    AiOutlineTwitter,
    AiOutlineLinkedin,
} from "react-icons/ai";

const ContactMe = () => {
    return (
        <div className="flex  md:flex-col text-3xl gap-5">
            <Link className="flex items-center" to="https://www.instagram.com/nikeshchaudhary52494/">
                <AiOutlineInstagram /><span className="hidden text-xl md:block">Instagram</span>
            </Link>
            <Link className="flex items-center" to="https://www.linkedin.com/in/nikeshchaudhary52494/">
                <AiOutlineLinkedin /><span className="hidden text-xl md:block">Linkedin</span>
            </Link>
            <Link className="flex items-center" to="https://twitter.com/nikesh52494">
                <AiOutlineTwitter /><span className="hidden text-xl md:block">Twitter</span>
            </Link>
        </div>
    )
}

export default ContactMe