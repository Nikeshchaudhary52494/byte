import React from 'react'
import ReactStars from "react-rating-stars-component"


const ReviewCard = ({ review }) => {

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true,
  };

  return (

    <div className="flex flex-col shadow-sm bg-slate-100 rounded-lg max-w-md p-10 w-full sm:3/4">
      <div className="flex justify-left mb-4 items-center">
        <img className="h-14 w-14 mr-4 object-cover rounded-full" src={review.avatar} alt="User" />
        <div>
          <p className='text-sm font-bold'>{review.name}</p>
          <ReactStars {...options} />
        </div>
      </div>
      <span className='text-sm'>{review.comment}</span>
    </div>

  )
}

export default ReviewCard 