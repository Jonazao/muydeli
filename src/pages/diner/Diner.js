import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import { BIG_CARD_SIZE } from '../../config/components.constants';

import ImageContainer from '../../components/commons/images/ImageContainer';
import Loader from '../../components/commons/Loader';
import Page from '../../components/layout/Page';
import DinerCard from '../../components/DinerCard';

import { useGetDinerQuery, useLazyGetDinerReviewsQuery } from '../../services/diners';
import useInfiniteLoading from '../../hooks/useInfiniteLoading';
import aspectRatios from '../../constants/images/aspect-ratios';

export default function Diner() {
  const params = useParams();
  const { dinerId } = params;
  const getDinerResponse = useGetDinerQuery(dinerId);
  const { isLoading: isDinerLoading, data: diner } = getDinerResponse;
  const [isPageReady, setIsPageReady] = useState(false);
  const [getDinerReview, getDinerReviewsResponse] = useLazyGetDinerReviewsQuery();
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
    if (dinerReviews.length > 0) {
      setTimeout(() => {
        setIsPageReady(true);
      }, 200);
    }
  }, [dinerReviews]);

  if (isDinerLoading) {
    return <h3>Loading...</h3>;
  }

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
                  item
                  imageUrl={review.photoUrl}
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
    </Page>
  );
}
