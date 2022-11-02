import React from 'react';
import Typography from '@mui/material/Typography';
import { CardContent } from '@mui/material';
import ReviewRating from './ReviewRating';
export default function ReviewScores({ scores }) {
  const { taste, presentation, quantity } = scores;
  return (
    <CardContent>
      <Typography
        variant='h4'
        paragraph
      >
        Score:
      </Typography>
      <Typography
        variant='h5'
        paragraph
      >
        Taste:
      </Typography>
      <ReviewRating
        score={taste.expectations}
        text={'Expectations:'}
        variant={'subtitle1'}
      />
      <ReviewRating
        score={taste.flavor}
        text={'Flavor:'}
        variant={'subtitle1'}
      />
      <Typography
        variant='h5'
        paragraph
      >
        Presentation:
      </Typography>
      <ReviewRating
        score={presentation.firstImpresion}
        text={'First impresion:'}
        variant={'subtitle1'}
      />
      <ReviewRating
        score={presentation.plating}
        text={'Plating:'}
        variant={'subtitle1'}
      />
      <Typography
        variant='h5'
        paragraph
      >
        Quantity:
      </Typography>
      <ReviewRating
        score={quantity.satietyLevel}
        text={'Satiety level:'}
        variant={'subtitle1'}
      />
      <ReviewRating
        score={quantity.garnishes}
        text={'Garnishes:'}
        variant={'subtitle1'}
      />
    </CardContent>
  );
}
