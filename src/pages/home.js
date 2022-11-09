import { Grid } from '@mui/material';
import React from 'react';
import ReviewCard from '../components/commons/ReviewCard';
import Page from '../components/layout/Page';
import { SMALL_CARD_SIZE } from '../config/components.constants';
import { useGetReviewQuery } from '../services/review';

export default function Home() {
  const getReviewResponse = useGetReviewQuery();
  const { isLoading, data } = getReviewResponse;

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <Page>
      <Grid container flexDirection="row" justifyContent="center" spacing={2}>
        <Grid item sx={{ width: SMALL_CARD_SIZE }}>
          <Grid container spacing={2} flexDirection="column">
            {data.result.map((review) => {
              return (
                <Grid item key={review.id} sx={{ width: '100%' }}>
                  <ReviewCard review={review} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}
