import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const dishTypes = [
  {
    value: 'Hamburger',
    label: 'Hamburger',
  },
  {
    value: 'Sushi',
    label: 'Sushi',
  },
  {
    value: 'Tacos',
    label: 'Tacos',
  },
];

export default function DishType({ value, onChange }) {
  return (
    <TextField id="create-dish-select" select label="Type" value={value} onChange={onChange} fullWidth>
      {dishTypes.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
