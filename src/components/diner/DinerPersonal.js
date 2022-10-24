import React from 'react';
import Typography from '@mui/material/Typography';

export default function DinerPersonal({ user }) {
  const { firstName, title } = user;
  return (
    <>
      <Typography component="div" variant="h5">
        {firstName}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" component="div">
        {title}
      </Typography>
    </>
  );
}
