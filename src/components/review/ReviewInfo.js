import React from 'react';
import Typography from '@mui/material/Typography';
import { CardContent, Rating } from '@mui/material';
import ReviewRating from './ReviewRating';
export default function ReviewInfo() {
  return (
    <CardContent>
     <Typography variant="h5">
        Nombre del platillo 
     </Typography>
     <Typography variant="subtitle1" color="text.secondary">
        Tipo de platillo    
     </Typography>
     <Typography variant="subtitle1" color="text.secondary">
        Restaurante del platillo 
     </Typography>
     <ReviewRating text={'Total Score'} variant={'h6'}/>
    </CardContent>
  );
}
