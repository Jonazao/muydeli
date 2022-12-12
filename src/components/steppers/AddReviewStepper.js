import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import MuiStep from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { isNil } from '../../validations/is-nil';

import Step from '../steppers/Step';
import SelectPlaceStep from './add-review-stepper/SelectPlaceStep';

const steps = [
  { label: 'Select a place', component: SelectPlaceStep, isOptional: false },
  { label: 'Upload photos', component: () => <h1>Step 2</h1>, isOptional: false },
  { label: 'Set ratings', component: () => <h1>Step 3</h1>, isOptional: false },
];

export default function AddReviewStepper() {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [selectedPlace, setSelectedPlace] = useState(null);

  const isValidStep = (step) => {
    switch (step) {
      case 0:
        return !isNil(selectedPlace);
      case 1:
        return true;
      case 2:
        return true;
      default:
        return null;
    }
  };

  const isStepOptional = (step) => {
    return step.isOptional;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleFinish = async () => {
    console.log('Done');
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    isValidStep(activeStep) && setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleSkip = () => {
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
  };

  const handleOnPlaceSelect = (place) => {
    setSelectedPlace(place);
  };

  const getStepperComponent = (step) => {
    const currentStep = steps[step];
    const StepComponent = currentStep.component;
    switch (step) {
      case 0:
        return <StepComponent selectedPlace={selectedPlace} setSelectedPlace={handleOnPlaceSelect} />;
      default:
        return StepComponent && <StepComponent />;
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
