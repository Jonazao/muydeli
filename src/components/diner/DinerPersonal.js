import React from 'react';
import Typography from '@mui/material/Typography';

export default function DinerPersonal({ user }) {
  const { firstName, lastName, title } = user;
  return (
    <>
      <Typography component="div" variant="h5">
        {`${firstName} ${lastName}`}
      </Typography>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        component="div"
        sx={{
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 1,
        }}
      >
        {title}
      </Typography>
    </>
  );
}
