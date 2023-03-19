import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const dishCategories = [
  {
    value: 'American',
    label: 'American',
  },
  {
    value: 'Japanese',
    label: 'Japanese',
  },
  {
    value: 'Mexican',
    label: 'Mexican',
  },
];

export default function DishCategory({ value, onChange }) {
  return (
    <TextField id="create-dish-select" select label="Category" value={value} onChange={onChange} fullWidth>
      {dishCategories.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
