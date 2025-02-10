import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { FaFilter } from "react-icons/fa6";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";
import { fetchProducts, setFilters } from "@/slices/productSlice/productsSlice";

const FilterModal = () => {
    const dispatch = useDispatch();
    const { categoryName, filters } = useSelector((state) => state.products);

    const [rating, setRating] = useState(filters?.ratings || "0");
    const [minPrice, setMinPrice] = useState(filters?.minPrice || 0);
    const [maxPrice, setMaxPrice] = useState(filters?.maxPrice || 2500);
    const [condition, setCondition] = useState(filters?.itemCondition || "");
    const [toggleFilter, setToggleFilter] = useState(false);

    const handelSubmit = () => {
        dispatch(setFilters({ minPrice, maxPrice, ratings: rating, itemCondition: condition, categoryName }));
        dispatch(fetchProducts());
        setToggleFilter(false);
    };

    const handelReset = () => {
        dispatch(setFilters({ minPrice: 0, maxPrice: 2500, ratings: 0, itemCondition: "" }));
        dispatch(fetchProducts());
        setToggleFilter(false);
    };

    return (
        <Dialog open={toggleFilter} onOpenChange={setToggleFilter}>
            <DialogTrigger asChild>
                <Button className="flex items-center bg-blue-500 rounded-full">
                    <FaFilter />
                    <span>Filter</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Filter Products</DialogTitle>
                </DialogHeader>

                <Label>Rating</Label>
                <Select value={rating} onValueChange={setRating}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a Rating" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Rating</SelectLabel>
                            <SelectItem value="1">1+ Star</SelectItem>
                            <SelectItem value="2">2+ Star</SelectItem>
                            <SelectItem value="3">3+ Star</SelectItem>
                            <SelectItem value="4">4+ Star</SelectItem>
                            <SelectItem value="5">5 Star</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Separator />

                <Label>Price Range</Label>
                <div className="flex gap-2">
                    <Input
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        min={0}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <Input
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        min={0}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>

                <Separator />

                <Label>Condition</Label>
                <RadioGroup
                    value={condition}
                    onValueChange={setCondition}
                    className="flex flex-col gap-2"
                >
                    <Label className="flex items-center gap-2">
                        <RadioGroupItem value="New" /> New
                    </Label>
                    <Label className="flex items-center gap-2">
                        <RadioGroupItem value="Renewed" /> Renewed
                    </Label>
                    <Label className="flex items-center gap-2">
                        <RadioGroupItem value="" /> Both
                    </Label>
                </RadioGroup>

                <Separator />

                <DialogFooter>
                    <div className="flex w-full gap-2">
                        <Button
                            onClick={handelReset}
                            className="w-full bg-red-500 hover:bg-red-400"
                        >
                            Reset
                        </Button>
                        <Button onClick={handelSubmit} className="w-full">
                            Apply Filters
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default FilterModal;
