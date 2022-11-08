import React from 'react';
import Typography from '@mui/material/Typography';
import { CardContent } from '@mui/material';
import ReviewRating from './ReviewRating';
import { finalScoreLabel } from '../../constants/criteria/labels';
export default function ReviewInfo({ dish, restaurantName, finalScore }) {
  const { name, type } = dish;
  return (
    <CardContent>
      <Typography variant="h5">{name}</Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
      >
        {type}
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
      >
        {restaurantName}
      </Typography>
      <ReviewRating
        score={finalScore}
        text={finalScoreLabel}
        variant="h6"
      />
    </CardContent>
  );
}
