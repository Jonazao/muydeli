import React, { useState, useEffect, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Autocomplete from '../../commons/Autocomplete';

import { isNil } from '../../../validations/is-nil';

export default function SelectDishStep({ dishes, selectedDish, setSelectedDish }) {
  const [autoCompleteSelectedOption, setAutoCompleteSelectedOption] = useState(selectedDish);

  const handleOnDishSelect = useCallback(() => {
    setSelectedDish(autoCompleteSelectedOption);
  }, [setSelectedDish, autoCompleteSelectedOption]);

  useEffect(() => {
    if (isNil(autoCompleteSelectedOption)) {
      setSelectedDish(autoCompleteSelectedOption);
    }
  }, [setSelectedDish, autoCompleteSelectedOption]);
  const getLabelOption = ({ name, type, foodType }) => `${name} - ${type} - ${foodType}`;
  return (
    <Grid container spacing={2} flexDirection="column" alignItems="flex-start">
      <Grid item xs={12} sx={{ width: '100%' }} alignSelf="center">
        <Autocomplete
          label="Select or create a dish"
          selectedOption={autoCompleteSelectedOption}
          setSelectedOption={setAutoCompleteSelectedOption}
          getLabelOption={getLabelOption}
          items={dishes}
          searchItemProperties={['name', 'type', 'foodType']}
        />
      </Grid>
      {autoCompleteSelectedOption && (
        <Grid item xs={12} sx={{ width: '100%' }} alignSelf="center">
          <Grid container flexDirection="row-reverse">
            <Grid item xs={12}>
              <Button fullWidth={true} variant="contained" onClick={handleOnDishSelect}>
                Select
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
