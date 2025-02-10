import { BsMouse } from "react-icons/bs";
import CategoriesList from "../Product/CategoriesList"
import Typed from "react-typed";

const Hero = () => {
    return (
        <div>
            <div className="md:flex overflow-x-auto overflow-y-hidden hidden">
                <div className="px-4 space-x-4 flex mx-auto">
                    <CategoriesList />
                </div>
            </div>

            <div className="min-h-screen md:min-h-[85vh] flex flex-col text-white bg-custom-background text-2xl justify-center items-center">
                <p className="font-mono text-xl">Welcome To Byte Ecommerce</p>
                <h2 className="font-bold text-center m-24 text-3xl">
                    <Typed strings={["FIND AMAZING PRODUCTS HERE..."]} typeSpeed={100} loop={true} backSpeed={50} />
                </h2>
                <a className="flex gap-2 items-center hover:text-cyan-600 duration-300" href="#container">
                    <BsMouse />
                    <span>Scroll</span>
                </a>
            </div>
        </div>
    )
}

export default Hero
