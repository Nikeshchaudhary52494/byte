import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'react-toastify';
import ship from "@/assets/ship.jpg"

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
        setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!/^\d{6}$/.test(shippingInfo.pinCode)) {
            toast.error('Please enter a valid 6-digit pin code.');
            return;
        }
        if (!/^\d{10}$/.test(shippingInfo.phoneNumber)) {
            toast.error('Please enter a valid 10-digit phone number.');
            return;
        }
        localStorage.setItem('shippingData', JSON.stringify(shippingInfo));
        navigate("/cart/shippinginfo");
    };

    return (
        <div className="fixed inset-0 z-10 flex bg-[#E2E8F0]">
            <div className="relative flex items-center justify-center flex-1">
                <img src={ship} alt="Shipping image" className="-rotate-90" />
            </div>
            <Card className="h-full w-[450px] z-10 rounded-none flex-shrink-0">
                <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                    <CardDescription>Enter your address for shipping</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                type="text"
                                name="address"
                                value={shippingInfo.address}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label htmlFor="state">State</Label>
                            <Input
                                id="state"
                                type="text"
                                name="state"
                                value={shippingInfo.state}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label htmlFor="country">Country</Label>
                            <Select
                                onValueChange={(value) => setShippingInfo({ ...shippingInfo, country: value })}
                                defaultValue={shippingInfo.country}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="India">India</SelectItem>
                                    <SelectItem value="USA">USA</SelectItem>
                                    <SelectItem value="UK">UK</SelectItem>
                                    <SelectItem value="Canada">Canada</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label htmlFor="pinCode">Pin Code</Label>
                            <Input
                                id="pinCode"
                                type="text"
                                name="pinCode"
                                value={shippingInfo.pinCode}
                                onChange={handleInputChange}
                                maxLength={6}
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input
                                id="phoneNumber"
                                type="text"
                                name="phoneNumber"
                                value={shippingInfo.phoneNumber}
                                onChange={handleInputChange}
                                maxLength={10}
                                required
                            />
                        </div>

                        <div className="flex gap-2 mt-2">
                            <Button
                                type="button"
                                className="w-full text-black bg-gray-300 hover:bg-gray-400"
                                onClick={() => navigate("/cart")}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="w-full">
                                Submit
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ShippingForm;
