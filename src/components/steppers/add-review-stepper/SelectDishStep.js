import React, { useState, useEffect, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Autocomplete from '../../commons/Autocomplete';
import Modal from '../../../components/commons/Modal';
import useModal from '../../../hooks/useModal';
import { isNil } from '../../../validations/is-nil';

import CreateDish from '../../../components/dish/CreateDish';

export default function SelectDishStep({ dishes, selectedDish, setSelectedDish }) {
  const { isOpen, toggle } = useModal();
  const [autoCompleteSelectedOption, setAutoCompleteSelectedOption] = useState(selectedDish);

  const handleOnDishSelect = useCallback(() => {
    setSelectedDish(autoCompleteSelectedOption);
  }, [setSelectedDish, autoCompleteSelectedOption]);

  useEffect(() => {
    if (isNil(autoCompleteSelectedOption)) {
      setSelectedDish(autoCompleteSelectedOption);
    }
  }, [setSelectedDish, autoCompleteSelectedOption]);
  const getLabelOption = ({ name }) => name;
  const getGroups = ({ type }) => type;
  const sortedDishes = [...dishes].sort((a, b) => {
    const textA = a.type.toUpperCase();
    const textB = b.type.toUpperCase();
    if (textA < textB) {
      return -1;
    }
    return textA > textB ? 1 : 0;
  });

  return (
    <Grid container spacing={2} flexDirection="column" alignItems="flex-start">
      <Grid item xs={12} sx={{ width: '100%' }} alignSelf="center">
        <Autocomplete
          label="Select or create a dish"
          selectedOption={autoCompleteSelectedOption}
          setSelectedOption={setAutoCompleteSelectedOption}
          getLabelOption={getLabelOption}
          items={sortedDishes}
          searchItemProperties={['name']}
          groupBy={getGroups}
          addNew={{
            onAdd: toggle,
            element: {
              name: 'Add New Dish',
              type: 'Action',
              foodType: '',
            },
          }}
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
      <Modal isOpen={isOpen}>
        <CreateDish handleClose={toggle} handleAdd={setSelectedDish} />
      </Modal>
    </Grid>
  );
}
