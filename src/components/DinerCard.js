import React from 'react';

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';

import DinerActions from './diner/DinerActions';
import DinerPersonal from './diner/DinerPersonal';
import DinerSummary from './diner/DinerSummary';

export default function DinerCard({ diner, onCardClick }) {
  const { id, firstName, title, info, contributions } = diner;

  const handleOnCardClick = () => {
    onCardClick(id);
  };

  const useCardActionArea = (Component) => {
    if (!onCardClick) return Component;
    return (
      <CardActionArea onClick={handleOnCardClick} sx={{ display: 'flex', alignItems: 'inherit' }}>
        {Component}
      </CardActionArea>
    );
  };
  return (
    <Card sx={{ display: 'flex' }}>
      {useCardActionArea(
        <>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image="https://www.beerinstitute.org/wp-content/uploads/2016/11/placeholder-3x4.png"
            alt="Diner's photo"
          />
          <Grid container direction="column" justifyContent="space-between" alignItems="flex-start" sx={{ pt: 2 }}>
            <Grid item sx={{ pl: 2, pr: 1 }}>
              <DinerPersonal user={{ firstName, title }} />
            </Grid>
            <Grid item sx={{ pl: 2, pr: 1 }}>
              <DinerSummary summary={info.summary} />
            </Grid>
            <Grid item sx={{ pl: 1, pr: 1 }}>
              <DinerActions contributions={contributions} />
            </Grid>
          </Grid>
        </>,
      )}
    </Card>
  );
}
