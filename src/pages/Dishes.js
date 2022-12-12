import React, { useCallback } from 'react';
import Grid from '@mui/material/Grid';

import { SMALL_CARD_SIZE } from '../config/components.constants';

import Page from '../components/layout/Page';
import Fab from '../components/commons/buttons/Fab';
import AddIcon from '@mui/icons-material/Add';
import AddReviewModal from '../components/modals/AddReviewModal';
import useAppModal from '../hooks/useAppModal';

export default function Dishes() {
  const { openModal, closeModal } = useAppModal();

  const handleFabClick = useCallback(() => {
    openModal({
      modalProps: {
        fullWidth: true,
        maxWidth: 'md',
        onClose: closeModal,
        title: 'Add dish review',
      },
      content: <AddReviewModal />,
    });
  }, [openModal, closeModal]);

  return (
    <Page>
      <Grid container flexDirection="row" justifyContent="center" spacing={2}>
        <Grid item sx={{ width: '100%', maxWidth: SMALL_CARD_SIZE }}>
          Test
        </Grid>
      </Grid>
      <Fab onClick={handleFabClick} Icon={AddIcon} />
    </Page>
  );
}
