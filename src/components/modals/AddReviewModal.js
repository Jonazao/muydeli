import React from 'react';
import Map from '../google-maps/Map';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Autocomplete from '../commons/Autocomplete';

export default function AddReviewModal() {
  return (
    <Grid container flexDirection="column" alignItems="flex-start">
      <Grid item xs={12} sx={{ width: '100%' }} alignSelf="center">
        <Autocomplete />
      </Grid>

      <Grid item alignSelf="center">
        <Typography variant="h2">Pizza Planet</Typography>
      </Grid>
      <Grid item xs={12} sx={{ width: '100%' }}>
        <Map />
      </Grid>
      <Grid item>
        <Typography variant="h6">Details</Typography>
      </Grid>
      <Grid item>
        <ul>
          <li>Italian Food</li>
          <li>$$</li>
          <li>4 Reviews</li>
          <li>Most Reviews: Pizza de peperoni</li>
        </ul>
      </Grid>
      <Grid container flexDirection="row-reverse">
        <Grid item xs={12}>
          <Button fullWidth={true} variant="contained">
            Select
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
