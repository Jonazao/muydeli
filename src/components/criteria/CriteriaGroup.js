import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import CriteriaCard from '../CriteriaCard';

export default function CriteriaGroup({ name, criteria }) {
  return (
    <Grid container flexDirection="column" spacing={1}>
      <Grid item>
        <Typography variant="h5">{name}</Typography>
      </Grid>
      {criteria.map((item, index) => (
        <Grid key={`criteria-card-${index}`} item>
          <CriteriaCard title={item.title} description={item.description} examples={item.examples} />
        </Grid>
      ))}
    </Grid>
  );
}
