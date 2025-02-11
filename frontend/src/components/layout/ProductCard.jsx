import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "../Product/review/RatingStars";


const ProductCard = ({ product }) => {

  return (
    <Link to={`/product/${product._id}`} >
      <div className="w-full p-4 flex justify-between flex-col hover:-translate-y-1 duration-500 shadow-md h-[400px]">
        <img className="max-h-[200px] object-contain" src={product.images[0].url} alt={product.name} />
        <div>
          <p className="text-xl font-medium">{product.name}</p>
          <div className="flex items-center gap-2">
            <RatingStars rating={product.ratings} />
            <span>{product.numberOfReviews}</span>
          </div>
          <span className="font-bold text-orange-500">{`$${product.price}`}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;