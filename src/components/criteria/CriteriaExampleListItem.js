import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function CriteriaExampleListItem({ icon: Icon, text }) {
  return (
    <ListItem>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={text} primaryTypographyProps={{ variant: 'body1' }} />
    </ListItem>
  );
}
