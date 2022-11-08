import React from 'react';
import Typography from '@mui/material/Typography';
import { CardContent } from '@mui/material';
import ReviewRating from './ReviewRating';
import {
  firstImpressionLabel,
  platingLabel,
  satietyLevelLabel,
  garnishesLabel,
  expectationsLabel,
  flavorLabel,
} from '../../constants/criteria/labels';
export default function ReviewScores({ scores }) {
  const { taste, presentation, quantity } = scores;
  const { expectations, flavor } = taste;
  const { firstImpression, plating } = presentation;
  const { satietyLevel, garnishes } = quantity;

  const variantSubtitleLabel = 'subtitle1';
  return (
    <CardContent>
      <Typography
        variant="h4"
        paragraph
      >
        Score:
      </Typography>
      <Typography
        variant="h5"
        paragraph
      >
        Taste:
      </Typography>
      <ReviewRating
        score={expectations}
        text={expectationsLabel}
        variant={variantSubtitleLabel}
      />
      <ReviewRating
        score={flavor}
        text={flavorLabel}
        variant={variantSubtitleLabel}
      />
      <Typography
        variant="h5"
        paragraph
      >
        Presentation:
      </Typography>
      <ReviewRating
        score={firstImpression}
        text={firstImpressionLabel}
        variant={variantSubtitleLabel}
      />
      <ReviewRating
        score={plating}
        text={platingLabel}
        variant={variantSubtitleLabel}
      />
      <Typography
        variant="h5"
        paragraph
      >
        Quantity:
      </Typography>
      <ReviewRating
        score={satietyLevel}
        text={satietyLevelLabel}
        variant={variantSubtitleLabel}
      />
      <ReviewRating
        score={garnishes}
        text={garnishesLabel}
        variant={variantSubtitleLabel}
      />
    </CardContent>
  );
}
