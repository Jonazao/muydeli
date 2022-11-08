import * as React from 'react';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReviewPersonal from '../review/ReviewPersonal';
import ReviewInfo from '../review/ReviewInfo';
import ReviewScores from '../review/ReviewScores';
import ImageContainer from './images/ImageContainer';
import aspectRatios from '../../constants/images/aspect-ratios';
import Rotate from '../../components/commons/Rotate';

export default function ReviewCard({ review }) {
  const { reviewDate, reviewer, dish, restaurantName, finalScore, scores } = review;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <ReviewPersonal reviewDate={reviewDate} reviewer={reviewer} />

      {/* THis is for the image */}
      <ImageContainer imageUrl={dish.photoUrl} component={CardMedia} aspectRatio={aspectRatios.fourToThree} />
      {/* This is the resume section */}
      <ReviewInfo dish={dish} restaurantName={restaurantName} finalScore={finalScore} />

      <CardActions disableSpacing>
        <Rotate
          expand={expanded}
          component={IconButton}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </Rotate>
      </CardActions>

      {/* As the name says, collapse section */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <ReviewScores scores={scores} />
      </Collapse>
    </Card>
  );
}
