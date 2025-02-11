import React from 'react'
import RatingStars from './RatingStars'

const ReviewCard = ({ review }) => {

  return (

    <div className="flex flex-col w-full max-w-md p-10 rounded-lg shadow-sm bg-slate-100 sm:3/4">
      <div className="flex items-center mb-4 justify-left">
        <img className="object-cover mr-4 rounded-full h-14 w-14" src={review.avatar} alt="User" />
        <div>
          <p className='text-sm font-bold'>{review.name}</p>
          <RatingStars rating={review.rating} />
        </div>
      </div>
      <span className='text-sm'>{review.comment}</span>
    </div>

  )
}

export default ReviewCard 