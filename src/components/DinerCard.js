import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import DinerActions from './diner/DinerActions';
import DinerPersonal from './diner/DinerPersonal';
import DinerSummary from './diner/DinerSummary';

export default function DinerCard() {
  return (
    <Card>
      <Box>Upper</Box>
      <Box>Lower</Box>
    </Card>
  );
}
