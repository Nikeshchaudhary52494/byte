import {
Book,
Camera,
HeadphonesIcon,
Lamp,
Laptop,
Shirt,
Smartphone,
Sofa,
Watch
} from "lucide-react"
import { MdOutlineToys } from "react-icons/md"


export const categoriesList = [
    {
        Icon: Smartphone,
        categoryName: "Phone",
        color: getRandomColor(),
    },
    {
        Icon: Laptop,
        categoryName: "Laptop",
        color: getRandomColor(),
    },
    {
        Icon: Shirt,
        categoryName: "Fashion",
        color: getRandomColor(),
    },
    {
        Icon: Lamp,
        categoryName: "Households",
        color: getRandomColor(),
    },
    {
        Icon: Watch,
        categoryName: "Watches",
        color: getRandomColor(),
    },
    {
        Icon: Sofa,
        categoryName: "Furniture",
        color: getRandomColor(),
    },
    {
        Icon: MdOutlineToys,
        categoryName: "Toys",
        color: getRandomColor(),
    },
    {
        Icon: HeadphonesIcon,
        categoryName: "Sound",
        color: getRandomColor(),
    },
    {
        Icon: Camera,
        categoryName: "Camera",
        color: getRandomColor(),
    },
    {
        Icon: Book,
        categoryName: "Books",
        color: getRandomColor(),
    }
];

function getRandomColor() {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#A833FF", "#33FFF5", "#FF8C33", "#FFD700", "#6A0DAD", "#00FA9A"];
    return colors[Math.floor(Math.random() * colors.length)];
}
