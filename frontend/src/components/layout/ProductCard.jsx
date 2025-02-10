import React from "react";
import { Link } from "react-router-dom";
import ReactStarts from "react-rating-stars-component";


const ProductCard = ({ product }) => {

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <Link to={`/product/${product._id}`} >
      <div className="w-[250px] p-4 flex justify-between flex-col hover:-translate-y-1 duration-500 shadow-md m-4 h-[400px]">
        <img className="max-h-[200px] object-contain" src={product.images[0].url} alt={product.name} />
        <div>
          <p className="font-medium text-xl">{product.name}</p>
          <div className="flex items-center gap-2">
            <ReactStarts {...options} />
            <span>{product.numberOfReviews}</span>
          </div>
          <span className="text-orange-500 font-bold">{`$${product.price}`}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;