import React from 'react';
import { Rating, Typography } from '@mui/material';
export default function ReviewRating({ text, variant, score }) {
  return (
    <>
      <Typography
        variant={variant}
        paragraph
      >
        {text}
      </Typography>
      <Rating
        name="review-rating"
        defaultValue={score}
        precision={0.5}
        readOnly
      />
    </>
  );
}
