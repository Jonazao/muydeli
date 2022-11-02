import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CriteriaExampleList from './criteria/CriteriaExampleList';

export default function CriteriaCard({ title, description, examples }) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`${title}-content`} id={`${title}-content`}>
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container flexDirection="column">
          <Grid item>
            <Typography variant="subtitle1">{description}</Typography>
          </Grid>
          <Grid item>
            <CriteriaExampleList examples={examples} />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}
