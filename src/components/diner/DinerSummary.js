import React from 'react';
import Typography from '@mui/material/Typography';

export default function DinerSummary({ summary }) {
  return (
    <Typography variant="body1" component="div">
      {summary}
    </Typography>
  );
}
