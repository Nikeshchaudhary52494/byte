import React from 'react'
import RatingStars from './RatingStars'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User } from 'lucide-react'

const ReviewCard = ({ review }) => {

  return (

    <Card className="w-full h-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center mb-4 justify-left">
          <Avatar className="w-12 h-12 mr-4 cursor-pointer" onClick={() => navigate("/user/profile", { state: location.pathname })}>
            <AvatarImage src={review.avatar} alt="User profile" />
            <AvatarFallback>
              <User size={28} />
            </AvatarFallback>
          </Avatar>
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