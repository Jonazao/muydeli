import React from 'react';
import IconButton from '@mui/material/IconButton';
import PlaceIcon from '@mui/icons-material/Place';
export default function FixedLocationIcon() {
  return (
    <IconButton
      disabled
      sx={{
        color: 'red',
        margin: '0',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <PlaceIcon fontSize="large" sx={{ color: 'red' }} />
    </IconButton>
  );
}
