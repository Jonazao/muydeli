import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DishType from '../dish/selects/DishType';
import DishCategory from '../dish/selects/DishCategory';
import { isEmpty } from '../../validations/is-empty';

export default function CreateDish({ handleClose, handleAdd }) {
  const [dialogValue, setDialogValue] = useState({
    name: '',
    type: '',
    category: '',
  });
  console.log(dialogValue);
  console.log(isEmpty(dialogValue.name));
  console.log(isEmpty(dialogValue.type));
  console.log(isEmpty(dialogValue.category));
  return (
    <>
      <DialogTitle>Add a new dish</DialogTitle>
      <DialogContent>
        <DialogContentText>Create a new dish, make sure it is not repeated</DialogContentText>
        <Grid container flexDirection="column" spacing={2}>
          <Grid item sm={12}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.name}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  name: event.target.value,
                })
              }
              label="name"
              type="text"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item sm={12}>
            <DishType
              value={dialogValue.type}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  type: event.target.value,
                })
              }
            />
          </Grid>
          <Grid item sm={12}>
            <DishCategory
              value={dialogValue.category}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  category: event.target.value,
                })
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => handleAdd(dialogValue)}
          disabled={isEmpty(dialogValue.name) || isEmpty(dialogValue.type) || isEmpty(dialogValue.category)}
        >
          Add
        </Button>
      </DialogActions>
    </>
  );
}
