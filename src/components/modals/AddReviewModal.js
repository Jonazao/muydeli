import React, { useState } from 'react';
import Map from '../google-maps/Map';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import foodType from '../../constants/dishes/food-type';

import Autocomplete from '../commons/Autocomplete';

import { useLazyGetPlacesQuery } from '../../services/places';

export default function AddReviewModal() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  return (
    <Grid container flexDirection="column" alignItems="flex-start">
      <Grid item xs={12} sx={{ width: '100%' }} alignSelf="center">
        <Autocomplete setSelectedOption={setSelectedPlace} lazyFetchFunction={useLazyGetPlacesQuery} />
      </Grid>
      {selectedPlace && (
        <>
          <Grid item alignSelf="center">
            <Typography variant="h2">{selectedPlace.name}</Typography>
          </Grid>
          <Grid item xs={12} sx={{ width: '100%' }}>
            <Map center={{ lat: selectedPlace.address.lat, lng: selectedPlace.address.lng }} />
          </Grid>
          <Grid item>
            <Typography variant="h6">Details</Typography>
          </Grid>
          <Grid item>
            <ul>
              <li>
                <strong>Food Type:</strong>
                {foodType[selectedPlace.foodType]}
              </li>
              <li>
                <strong>Price Range:</strong>
                {Array.from({ length: selectedPlace.priceRange })
                  .map((item, index) => '$')
                  .join('')}
              </li>
              <li>
                <strong>Number of reviews:</strong>
                {selectedPlace.numberOfReviews} Reviews
              </li>
              <li>
                <strong>Most Reviews:</strong> {selectedPlace.mostReviewedDish}
              </li>
            </ul>
          </Grid>
          <Grid container flexDirection="row-reverse">
            <Grid item xs={12}>
              <Button fullWidth={true} variant="contained">
                Select
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}
