import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Page from '../layout/Page';
import { BIG_CARD_SIZE } from '../../config/components.constants';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function AppModal() {
  const { isOpen, modalProps, content } = useSelector((store) => store.modal);
  const { onClose, title, ...restModalProps } = modalProps;
  if (!isOpen) {
    return null;
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      {...restModalProps}
      fullScreen={true}
      TransitionComponent={Transition}
      keepMounted
    >
      <Box>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            {title}
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Page>
          <Grid
            container
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{ width: '100%' }}
          >
            <Grid item sx={{ width: '100%', maxWidth: BIG_CARD_SIZE }}>
              <Grid container spacing={2} flexDirection="column" alignItems="center" sx={{ p: 1 }}>
                <Grid item sx={{ width: '100%' }}>
                  {content}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Page>
      </Box>
    </Dialog>
  );
}
