import React from 'react';
import CardHeader from '@mui/material/CardHeader';
import { Avatar } from '@mui/material';
import { red } from '@mui/material/colors';
export default function ReviewPersonal() {
  return (
    <>
     <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="">
            R
          </Avatar>
        }
        action={'Review Date'}
        title="Nombre del usuario"
      />
    </>
  );
}
