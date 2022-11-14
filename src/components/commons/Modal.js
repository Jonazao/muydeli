import React from 'react';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';

export default function AppModal({ isOpen, children, ...rest }) {
  const theme = useTheme();
  if (!isOpen) {
    return null;
  }
  return (
    <Dialog open={isOpen} {...rest}>
      <Box sx={{ backgroundColor: theme.palette.background.default }}>{children}</Box>
    </Dialog>
  );
}
