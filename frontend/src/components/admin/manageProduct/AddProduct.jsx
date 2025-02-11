import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, getAdminProducts, resetIsProductAdded } from "../../../slices/adminSlice/adminSlice";
import { useNavigate } from "react-router-dom";
import { STATUSES } from "../../../store/statuses";
import Loader from "../../layout/Loader/Loader";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

const AddProductForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, isProductAdded } = useSelector((state) => state.admin);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        itemCondition: "",
    });
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = ["Laptop",
        "Phone",
        "Watches",
        "Fashion",
        "Households",
        "Sound",
        "Toys",
        "Furniture",
        "Books",
        "Camera",
        "MISCELLANEOUS"];
    const itemConditions = ["New", "Renewed"];

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files || []);
        setImages(files);
        setImagesPreview([]);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((prev) => [...prev, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = new FormData();
        productData.append("name", formData.name);
        productData.append("description", formData.description);
        productData.append("price", formData.price);
        productData.append("category", formData.category);
        productData.append("stock", formData.stock);
        productData.append("itemCondition", formData.itemCondition);
        images.forEach((image) => productData.append("images", image));

        dispatch(createProduct(productData));
    };

    useEffect(() => {
        if (isProductAdded) {
            toast.success("New Product Added");
            dispatch(resetIsProductAdded());
            dispatch(getAdminProducts());
            navigate("/admin/manageproduct");
        }
    }, [isProductAdded, dispatch, navigate]);

    if (status === STATUSES.LOADING) return <Loader />;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-primary to-slate-50">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Add Product</CardTitle>
                    <CardDescription>Enter product details below</CardDescription>
                </CardHeader>
                <CardContent className="overflow-auto h-[75vh]">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" required placeholder="Product name" value={formData.name} onChange={handleInputChange} />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" required placeholder="Product description" value={formData.description} onChange={handleInputChange} />
                        </div>
                        <div>
                            <Label htmlFor="price">Price</Label>
                            <Input id="price" name="price" type="number" required placeholder="Product price" value={formData.price} onChange={handleInputChange} />
                        </div>
                        <div>
                            <Label>Category</Label>
                            <Select onValueChange={(value) => handleSelectChange("category", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Condition</Label>
                            <Select onValueChange={(value) => handleSelectChange("itemCondition", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select condition" />
                                </SelectTrigger>
                                <SelectContent>
                                    {itemConditions.map((condition) => (
                                        <SelectItem key={condition} value={condition}>
                                            {condition}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="stock">Stock</Label>
                            <Input id="stock" name="stock" type="number" required placeholder="Stock quantity" value={formData.stock} onChange={handleInputChange} />
                        </div>
                        <div>
                            <Label htmlFor="images">Upload Images</Label>
                            <Input id="images" type="file" accept="image/*" multiple onChange={handleFileChange} />
                        </div>
                        <div className="flex h-20 gap-2 p-2 overflow-x-auto border rounded-md">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Preview" className="object-cover w-16 h-16 rounded-md" />
                            ))}
                        </div>
                        <Button type="submit" className="w-full">
                            Add Product
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddProductForm;
