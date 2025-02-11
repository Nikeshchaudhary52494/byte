import { IoStarSharp, IoStarHalfSharp } from "react-icons/io5";

const RatingStars = ({ rating }) => {
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, index) => {
                if (index < Math.floor(rating)) {
                    return (
                        <IoStarSharp
                            key={index}
                            className="w-6 h-6 mr-1 text-yellow-500"
                        />
                    );
                } else if (index < Math.ceil(rating)) {
                    return (
                        <IoStarHalfSharp
                            key={index}
                            className="w-6 h-6 mr-1 text-yellow-500"
                        />
                    );
                } else {
                    return (
                        <IoStarSharp
                            key={index}
                            className="w-6 h-6 mr-1 text-gray-300"
                        />
                    );
                }
            })}
        </div>
    );
};

export default RatingStars;