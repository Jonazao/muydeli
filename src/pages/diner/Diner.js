import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import { BIG_CARD_SIZE } from '../../config/components.constants';

import ImageContainer from '../../components/commons/images/ImageContainer';
import Loader from '../../components/commons/Loader';
import Page from '../../components/layout/Page';
import Modal from '../../components/commons/Modal';
import DinerCard from '../../components/DinerCard';
import ReviewsModal from '../../components/modals/ReviewsModal';

import { useGetDinerQuery, useLazyGetDinerReviewsQuery } from '../../services/diners';
import useInfiniteLoading from '../../hooks/useInfiniteLoading';
import useModal from '../../hooks/useModal';
import aspectRatios from '../../constants/images/aspect-ratios';

export default function Diner() {
  const params = useParams();
  const { dinerId } = params;
  const getDinerResponse = useGetDinerQuery(dinerId);
  const { isLoading: isDinerLoading, data: diner } = getDinerResponse;
  const [isPageReady, setIsPageReady] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [getDinerReview, getDinerReviewsResponse] = useLazyGetDinerReviewsQuery();
  const { isOpen, toggle } = useModal();
  const {
    items: dinerReviews,
    hasNext,
    loadNext,
    loadNextRef,
  } = useInfiniteLoading({
    fetchItems: (params) => getDinerReview({ id: dinerId, params }),
  });
  const { isLoading: isDinerReviewsLoading } = getDinerReviewsResponse;
  useEffect(() => {
    if (dinerReviews.length > 0 && !isPageReady) {
      setTimeout(() => {
        setIsPageReady(true);
      }, 200);
    }
  }, [dinerReviews, isPageReady]);

  if (isDinerLoading) {
    return (
      <Page>
        <Grid container flexDirection="column" alignItems="center" spacing={2}>
          <Loader />
        </Grid>
      </Page>
    );
  }

  const handleOnImageClick = (id) => {
    setSelectedItem(id);
    toggle();
  };

  return (
    <Page>
      <Grid container flexDirection="column" alignItems="center" spacing={2}>
        <Grid item sx={{ width: '100%', maxWidth: BIG_CARD_SIZE }}>
          <DinerCard diner={diner}>Diner</DinerCard>
        </Grid>
        <Grid item sx={{ width: '100%', maxWidth: BIG_CARD_SIZE }}>
          <Divider variant="middle" />
        </Grid>
        {!isDinerReviewsLoading && (
          <Grid item sx={{ width: '100%', maxWidth: BIG_CARD_SIZE }}>
            <Grid container justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
              {dinerReviews.map((review) => (
                <ImageContainer
                  onClick={() => handleOnImageClick(review.id)}
                  item
                  imageUrl={review.dish.photoUrl}
                  aspectRatio={aspectRatios.oneToOne}
                  key={review.id}
                  xs={4}
                  imageProps={{
                    sx: {
                      margin: 1,
                    },
                  }}
                  component={Grid}
                />
              ))}
            </Grid>
          </Grid>
        )}
        {isPageReady && hasNext && (
          <Grid item ref={loadNextRef} onClick={() => loadNext()}>
            <Loader />
          </Grid>
        )}
      </Grid>
      <Modal isOpen={isOpen} fullScreen={true}>
        <ReviewsModal handleClose={toggle} reviews={dinerReviews} selectedItem={selectedItem}>
          {isPageReady && hasNext && (
            <Box item ref={loadNextRef} onClick={() => loadNext()}>
              <Loader />
            </Box>
          )}
        </ReviewsModal>
      </Modal>
    </Page>
  );
}
