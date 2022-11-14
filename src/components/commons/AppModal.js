import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';

export default function AppModal() {
  const theme = useTheme();
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const { isOpen, modalProps, content } = useSelector((store) => store.modal);
  if (!isOpen) {
    return null;
  }
  return (
    <Dialog open={isOpen} {...modalProps} TransitionComponent={Transition}>
      <Box sx={{ backgroundColor: theme.palette.background.default }}>{content}</Box>
    </Dialog>
  );
}
