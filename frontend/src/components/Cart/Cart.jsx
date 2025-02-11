import React from 'react'
import { Link, useLocation } from "react-router-dom"
import LoggedInComponenet from './LoginUserCart';
import { useSelector } from 'react-redux';
import cart from "@/assets/cart.webp"

const Cart = () => {
    const { isAuthenticated } = useSelector((state) => state.user)

    const location = useLocation()

    return (
        <div className='h-full pb-52'>
            {isAuthenticated ? (
                <LoggedInComponenet />) : (
                <div class="text-center  m-20 h-[50vh]">
                    <div class="grid  place-content-center">
                        <img class="h-[150px]" src={cart} alt="cartImage" />
                    </div>
                    <h3 class="text-2xl m-5 text-black font-thin">
                        Missing Cart items?
                    </h3>
                    <p>Login to see items you added previously</p>
                    <Link to="/user/login" state={location.pathname}>
                        <button class="bg-orange-600 m-4 w-[200px] h-10 rounded-sm">
                            Login
                        </button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Cart