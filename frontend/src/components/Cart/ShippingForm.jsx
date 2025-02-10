import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShippingForm = () => {
    const navigate = useNavigate();
    const [shippingInfo, setShippingInfo] = useState({
        address: '',
        state: '',
        country: 'India',
        phoneNumber: '',
        pinCode: '',
    });

    const handleInputChange = (e) => {
        setShippingInfo({
            ...shippingInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const shippingData = {
            address: shippingInfo.address,
            state: shippingInfo.state,
            country: shippingInfo.country,
            pinCode: shippingInfo.pinCode,
            phoneNumber: shippingInfo.phoneNumber,
        };
        localStorage.setItem('shippingData', JSON.stringify(shippingData));
        navigate("/cart/shippinginfo");
    };

    return (
        <div className="bg-slate-900 flex flex-col items-center inset-0 z-10 fixed p-10">
            <div className='bg-slate-800 p-5 rounded-md'>
                <p className="text-white text-3xl font-bold mb-5">Shipping Information</p>
                <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label className="text-white">Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={shippingInfo.address}
                            onChange={handleInputChange}
                            className="w-full outline-none p-2 rounded-md"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-white">State:</label>
                        <input
                            type="text"
                            name="state"
                            value={shippingInfo.state}
                            onChange={handleInputChange}
                            className="w-full outline-none p-2 rounded-md"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-white">Country:</label>
                        <input
                            type="text"
                            name="country"
                            value={shippingInfo.country}
                            onChange={handleInputChange}
                            className="w-full outline-none p-2 rounded-md"
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-white">Pin Code:</label>
                        <input
                            type="text"
                            name="pinCode"
                            value={shippingInfo.pinCode}
                            onChange={handleInputChange}
                            className="w-full outline-none p-2 rounded-md"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-white">Phone Number:</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={shippingInfo.phoneNumber}
                            onChange={handleInputChange}
                            className="w-full outline-none p-2 rounded-md"
                            required
                        />
                    </div>



                    <button
                        type="submit"
                        className="w-full p-2 bg-teal-600 rounded-lg hover:bg-teal-700"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ShippingForm;
