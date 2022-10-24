import React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';

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

  return (
    <Page>
      <Grid container flexDirection="row" justifyContent="center" spacing={2}>
        <Grid item sx={{ width: '100%', maxWidth: BIG_CARD_SIZE }}>
          <DinerCard diner={diner}>Diner</DinerCard>
        </Grid>
      </Grid>
    </Page>
  );
}
