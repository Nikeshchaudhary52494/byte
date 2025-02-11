import React from 'react'
import RatingStars from './RatingStars'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const ReviewCard = ({ review }) => {

  return (

    <Card className="w-full h-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center mb-4 justify-left">
          <img className="object-cover mr-4 rounded-full h-14 w-14" src={review.avatar} alt="User" />
          <div>
            <p className='text-sm font-bold'>{review.name}</p>
            <RatingStars rating={review.rating} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className='text-sm'>{review.comment}</p>
      </CardContent>
    </Card>

  )
}

export default ReviewCard 