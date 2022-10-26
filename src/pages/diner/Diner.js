import React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import { BIG_CARD_SIZE } from '../../config/components.constants';

import Page from '../../components/layout/Page';
import DinerCard from '../../components/DinerCard';

import { useGetDinerQuery } from '../../services/diners';

export default function Diner() {
  const params = useParams();
  const { dinerId } = params;
  const getDinerResponse = useGetDinerQuery(dinerId);
  const { isLoading, data: diner } = getDinerResponse;
  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  const { reviews } = diner;
  return (
    <Page>
      <Grid container flexDirection="column" alignItems="center" spacing={2}>
        <Grid item sx={{ width: '100%', maxWidth: BIG_CARD_SIZE }}>
          <DinerCard diner={diner}>Diner</DinerCard>
        </Grid>
        <Grid item sx={{ width: '100%', maxWidth: BIG_CARD_SIZE }}>
          <Divider variant="middle" />
        </Grid>
        <Grid item sx={{ width: '100%', maxWidth: BIG_CARD_SIZE }}>
          <Grid container>
            {reviews.map((review) => (
              <Grid item key={review.id} sm={4}>
                <img
                  src={`${review.photoUrl}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${review.photoUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={review.dish.name}
                  loading="lazy"
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}
