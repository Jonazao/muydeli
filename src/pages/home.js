import { Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewCard from '../components/commons/ReviewCard';
import Page from '../components/layout/Page';
import { SMALL_CARD_SIZE } from '../config/components.constants';
import { useGetDinerQuery } from '../services/diners';

export default function Home() {
  const navigate=useNavigate()
  const getReviewResponse=useGetDinerQuery();
  const {isLoading, data}=getReviewResponse;

  if(isLoading){
    return <h3>Loading...</h3>
  }
  return (
    <Page>
       <Grid container flexDirection="row" justifyContent="center" spacing={2}>
        <Grid item sx={{ width: '100%', maxWidth: SMALL_CARD_SIZE }}>
          <Grid container>
                <Grid sx={{ width: '100%' }}>
                  <ReviewCard/>
                </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}
