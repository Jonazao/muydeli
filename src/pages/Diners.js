import React from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';

import { NAVIGATION_DINERS_URL } from '../config/configureRoutes';
import { SMALL_CARD_SIZE } from '../config/components.constants';

import Page from '../components/layout/Page';
import DinerCard from '../components/DinerCard';

import { useGetDinersQuery } from '../services/diners';

export default function Diners() {
  const navigate = useNavigate();
  const getDinersResponse = useGetDinersQuery();
  const { isLoading, data } = getDinersResponse;

  const onCardClick = (id) => {
    navigate(`${NAVIGATION_DINERS_URL}/${id}`);
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  return (
    <Page>
      <Grid container flexDirection="row" justifyContent="center" spacing={2}>
        <Grid item sx={{ width: '100%', maxWidth: SMALL_CARD_SIZE }}>
          <Grid container>
            {data.result.map((diner) => {
              return (
                <Grid key={diner.id} item sx={{ width: '100%' }}>
                  <DinerCard diner={diner} onCardClick={onCardClick} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}
