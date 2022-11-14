import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';

import ReviewCard from '../ReviewCard';

import { SMALL_CARD_SIZE } from '../../config/components.constants';
import Page from '../layout/Page';

export default function ReviewsModal({ reviews, selectedItem, handleClose, children }) {
  const [isPageReady, setIsPageReady] = useState(false);
  useEffect(() => {
    if (reviews.length > 0 && !isPageReady) {
      setTimeout(() => {
        setIsPageReady(true);
      }, 200);
    }
  }, [reviews, isPageReady]);

  useEffect(() => {
    if (selectedItem) {
      const selectedItemElement = document.getElementById(selectedItem);
      selectedItemElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, [selectedItem]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </Box>
      <Page>
        <Grid container flexDirection="column" justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
          <Grid item sx={{ width: '100%', maxWidth: SMALL_CARD_SIZE }}>
            <Grid container spacing={2} flexDirection="column" alignItems="center" sx={{ p: 1 }}>
              {reviews?.map((review) => {
                return (
                  <Grid item key={review.id} id={review.id} sx={{ width: '100%' }}>
                    <ReviewCard review={review} />
                  </Grid>
                );
              })}
              {/* {isPageReady && loader} */}
            </Grid>
          </Grid>
          <Grid item>{children}</Grid>
        </Grid>
      </Page>
    </>
  );
}
