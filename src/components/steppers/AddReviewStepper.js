import React, { useState, useEffect, useCallback, useRef } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import MuiStep from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { isNil } from '../../validations/is-nil';

import Step from '../steppers/Step';
import SelectPlaceStep from './add-review-stepper/SelectPlaceStep';
import SelectDishStep from './add-review-stepper/SelectDishStep';
import SelectPhotoStep from './add-review-stepper/SelectPhotoStep';
import AddReviewStep from './add-review-stepper/AddReviewStep';

const stepIds = {
  PLACE: 'PLACE',
  DISH: 'DISH',
  PHOTO: 'PHOTO',
  RATING: 'RATING',
};

const steps = [
  { id: stepIds.PLACE, label: 'Select a place', component: SelectPlaceStep, isOptional: false },
  { id: stepIds.DISH, label: 'Select dish', component: SelectDishStep, isOptional: false },
  { id: stepIds.PHOTO, label: 'Upload photos', component: SelectPhotoStep, isOptional: false },
  { id: stepIds.RATING, label: 'Set ratings', component: AddReviewStep, isOptional: false },
];

const defaultScores = {
  isFinished: false,
  taste: {
    expectation: null,
    flavor: null,
  },
  presentation: {
    firstImpression: null,
    plating: null,
  },
  quantity: {
    satietyLevel: null,
    garnishes: null,
  },
};

export default function AddReviewStepper() {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);
  const [file, setFile] = useState(null);
  const [scores, setScores] = useState(defaultScores);

  const isValidStep = useCallback(
    (step) => {
      const currentStep = steps[step];
      switch (currentStep.id) {
        case stepIds.PLACE:
          return !isNil(selectedPlace);
        case stepIds.DISH:
          return true;
        case stepIds.PHOTO:
          return !isNil(file);
        case stepIds.RATING:
          return scores.isFinished;
        default:
          return true;
      }
    },
    [selectedPlace, file, scores],
  );

  const isStepOptional = (step) => {
    return step.isOptional;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleFinish = useCallback(async () => {
    const payload = {
      selectedPlace,
      file,
      scores,
    };
    console.log(payload);
  }, [selectedPlace, file, scores]);

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }, [setActiveStep]);

  const handleNext = useCallback(() => {
    isValidStep(activeStep) && setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }, [isValidStep, setActiveStep, activeStep]);

  const handleSkip = useCallback(() => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  }, [setSkipped, setActiveStep, activeStep]);

  const handleOnPlaceSelect = useCallback(
    (place) => {
      setSelectedPlace(place);
    },
    [setSelectedPlace],
  );

  const handleOnDishSelect = useCallback(
    (dish) => {
      setSelectedDish(dish);
    },
    [setSelectedDish],
  );

  const getStepperComponent = (step) => {
    const currentStep = steps[step];
    const StepComponent = currentStep.component;
    switch (currentStep.id) {
      case stepIds.PLACE:
        return <StepComponent selectedPlace={selectedPlace} setSelectedPlace={handleOnPlaceSelect} />;
      case stepIds.DISH:
        return (
          <StepComponent
            dishes={selectedPlace.dishes}
            selectedDish={selectedDish}
            setSelectedDish={handleOnDishSelect}
          />
        );
      case stepIds.PHOTO:
        return <StepComponent file={file} setFile={setFile} />;
      case stepIds.RATING:
        return <StepComponent scores={scores} setScores={setScores} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!isNil(selectedPlace)) {
      handleNext();
    }
    // eslint-disable-next-line
  }, [selectedPlace]);

  return (
    <Box sx={{ width: '100%' }} ref={containerRef}>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <MuiStep key={step.label} {...stepProps}>
              <StepLabel {...labelProps}>{step.label}</StepLabel>
            </MuiStep>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Done!</Typography>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ pt: 2 }}>
            <Step>{getStepperComponent(activeStep)}</Step>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            {activeStep !== 0 && (
              <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            {activeStep !== steps.length - 1 ? (
              <Button onClick={handleNext} disabled={!isValidStep(activeStep)}>
                Next
              </Button>
            ) : (
              <Button onClick={handleFinish} disabled={!isValidStep(activeStep)}>
                Finish
              </Button>
            )}
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
