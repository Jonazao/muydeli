import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import criteriaGroups from '../../../constants/criteria/';
import SentimentalRating from '../../commons/SentimentalRating';

export default function AddReviewStep({ scores, setScores }) {
  const [ratings, setRatings] = useState(scores);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentCriteria, setCurrentCriteria] = useState(0);
  const [finished, setFinished] = useState(false);
  const onRatingSelect = (rating) => {
    const criteria = criteriaGroups[currentCategory].criteria.length;
    const haveMoreCriteria = criteria - currentCriteria > 1;
    const newRatings = { ...ratings };
    newRatings[criteriaGroups[currentCategory].id][criteriaGroups[currentCategory].criteria[currentCriteria].id] =
      rating;
    setRatings(newRatings);
    if (haveMoreCriteria) {
      setCurrentCriteria(currentCriteria + 1);
    } else {
      const categories = criteriaGroups.length;
      const haveMoreCategories = categories - currentCategory > 1;
      if (haveMoreCategories) {
        setCurrentCategory(currentCategory + 1);
        setCurrentCriteria(0);
      } else {
        setFinished(true);
        newRatings.isFinished = true;
        setScores(newRatings);
      }
    }
  };
  return (
    <Grid container flexDirection="row" justifyContent="center" spacing={2}>
      <Grid item sx={{ width: '100%' }}>
        <Grid container flexDirection="column" spacing={4}>
          {!finished ? (
            <Grid key={`criteria-group-${criteriaGroups[currentCategory].name}`} item>
              <p>
                {criteriaGroups[currentCategory].name}
                {' - '}
                {criteriaGroups[currentCategory].criteria[currentCriteria].title}
              </p>
              <p>{criteriaGroups[currentCategory].criteria[currentCriteria].description}</p>
              <SentimentalRating
                id={`${criteriaGroups[currentCategory].name}-${criteriaGroups[currentCategory].criteria[currentCriteria].title}`}
                onRateChange={onRatingSelect}
                rating={
                  ratings[criteriaGroups[currentCategory].id][
                    criteriaGroups[currentCategory].criteria[currentCriteria].id
                  ]
                }
              />
            </Grid>
          ) : (
            <Grid item>
              <p>All categories rated</p>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
