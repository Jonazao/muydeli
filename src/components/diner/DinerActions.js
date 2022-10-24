import React from 'react';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import PlaceIcon from '@mui/icons-material/Place';
import RateReviewIcon from '@mui/icons-material/RateReview';
import CommentIcon from '@mui/icons-material/Comment';

export default function DinerActions({ contributions }) {
  const { places, reviews, comments } = contributions;
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <IconButton aria-label="places">
          <Badge badgeContent={places} color="info">
            <PlaceIcon color="primary" />
          </Badge>
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton aria-label="reviews">
          <Badge badgeContent={reviews} color="info">
            <RateReviewIcon color="primary" />
          </Badge>
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton aria-label="comments">
          <Badge badgeContent={comments} color="info">
            <CommentIcon color="primary" />
          </Badge>
        </IconButton>
      </Grid>
    </Grid>
  );
}
