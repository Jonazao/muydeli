import React from 'react';
import Typography from '@mui/material/Typography';

export default function DinerSummary({ summary }) {
  return (
    <Typography
      sx={{
        display: '-webkit-box',
        overflow: 'hidden',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 1,
      }}
      variant="body1"
    >
      {summary}
    </Typography>
  );
}
