import React, { useState, useEffect } from 'react';
import Map from '../google-maps/Map';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import foodType from '../../constants/dishes/food-type';

import Autocomplete from '../commons/Autocomplete';

import { useLazyGetPlacesQuery } from '../../services/places';
import { isNil } from '../../validations/is-nil';

export default function SelectPlace({ selectedPlace, setSelectedPlace }) {
  const [autoCompleteSelectedOption, setAutoCompleteSelectedOption] = useState(selectedPlace);
  const handleOnPlaceSelect = () => {
    setSelectedPlace(autoCompleteSelectedOption);
  };

  useEffect(() => {
    if (isNil(autoCompleteSelectedOption)) {
      setSelectedPlace(autoCompleteSelectedOption);
    }
  }, [setSelectedPlace, autoCompleteSelectedOption]);

  return (
    <Grid container flexDirection="column" alignItems="flex-start">
      <Grid item xs={12} sx={{ width: '100%' }} alignSelf="center">
        <Autocomplete
          selectedOption={autoCompleteSelectedOption}
          setSelectedOption={setAutoCompleteSelectedOption}
          lazyFetchFunction={useLazyGetPlacesQuery}
        />
      </Grid>
      {autoCompleteSelectedOption && (
        <>
          <Grid item alignSelf="center">
            <Typography variant="h2">{autoCompleteSelectedOption.name}</Typography>
          </Grid>
          <Grid item xs={12} sx={{ width: '100%' }}>
            <Map
              center={{ lat: autoCompleteSelectedOption.address.lat, lng: autoCompleteSelectedOption.address.lng }}
            />
          </Grid>
          <Grid item>
            <Typography variant="h6">Details</Typography>
          </Grid>
          <Grid item>
            <ul>
              <li>
                <strong>Food Type:</strong>
                {foodType[autoCompleteSelectedOption.foodType]}
              </li>
              <li>
                <strong>Price Range:</strong>
                {Array.from({ length: autoCompleteSelectedOption.priceRange })
                  .map((item, index) => '$')
                  .join('')}
              </li>
              <li>
                <strong>Number of reviews:</strong>
                {autoCompleteSelectedOption.numberOfReviews} Reviews
              </li>
              <li>
                <strong>Most Reviews:</strong> {autoCompleteSelectedOption.mostReviewedDish}
              </li>
            </ul>
          </Grid>
          <Grid container flexDirection="row-reverse">
            <Grid item xs={12}>
              <Button fullWidth={true} variant="contained" onClick={handleOnPlaceSelect}>
                Select
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}
