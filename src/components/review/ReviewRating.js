import React from 'react';
import { Rating, Typography } from '@mui/material';
export default function ReviewRating({text,variant}) {
  return (   
    <>
        <Typography variant={variant} paragraph>
            {text}
        </Typography>
        <Rating name="half-rating" defaultValue={3.5} precision={0.5} readOnly/>
    </>
  );
}
