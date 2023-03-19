import React from 'react';
import AddReviewStepper from '../steppers/AddReviewStepper';

export default function AddReviewModal(props) {
  return <AddReviewStepper handleModalClose={props.handleModalClose} />;
}
