import React from 'react';
import Typography from '@mui/material/Typography';
import { CardContent } from '@mui/material';
import ReviewRating from './ReviewRating';
export default function ReviewInfo({ dish, restaurantName, finalScore }) {
  return (
    <CardContent>
      <Typography variant='h5'>{dish.name}</Typography>
      <Typography
        variant='subtitle1'
        color='text.secondary'
      >
        {dish.type}
      </Typography>
      <Typography
        variant='subtitle1'
        color='text.secondary'
      >
        {restaurantName}
      </Typography>
      <ReviewRating
        score={finalScore}
        text={'Total Score'}
        variant={'h6'}
      />
    </CardContent>
  );
}
