import React from 'react';
import Typography from '@mui/material/Typography';
import { CardContent } from '@mui/material';
import ReviewRating from './ReviewRating';
export default function ReviewScores() {
  return (
    <CardContent>
          <Typography variant='h4' paragraph>Score:</Typography>
          <Typography variant='h5' paragraph>
            Sabor:
          </Typography>
          <ReviewRating text={'Expectativas:'} variant={'subtitle1'}/>
          <ReviewRating text={'Gusto:'} variant={'subtitle1'}/>
          <Typography variant='h5' paragraph>
            Presentacion:
          </Typography>
          <ReviewRating text={'Primera impresion:'} variant={'subtitle1'}/>
          <ReviewRating text={'Emplatado:'} variant={'subtitle1'}/>
          <Typography variant='h5' paragraph>
            Cantidad:
          </Typography>
          <ReviewRating text={'Nivel de saciedad:'} variant={'subtitle1'}/>
          <ReviewRating text={'Complementos extras:'} variant={'subtitle1'}/>
    </CardContent>
  );
}
