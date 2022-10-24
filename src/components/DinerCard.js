import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';

import DinerActions from './diner/DinerActions';
import DinerPersonal from './diner/DinerPersonal';
import DinerSummary from './diner/DinerSummary';

export default function DinerCard({ diner, onCardClick }) {
  const { firstName } = diner;

  const handleOnCardClick = () => {
    onCardClick('Clicked');
  };

  const useCardActionArea = (Component) => {
    if (!onCardClick) return Component;
    return <CardActionArea onClick={handleOnCardClick}>{Component}</CardActionArea>;
  };
  return <Card>{useCardActionArea(<h1>{firstName}</h1>)}</Card>;
}
