import React from 'react';
import CriteriaExampleListItem from './CriteriaExampleListItem';
import List from '@mui/material/List';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

export default function CriteriaExampleList({ examples }) {
  return (
    <List>
      <CriteriaExampleListItem icon={SentimentVerySatisfiedIcon} text={examples.excellent} />
      <CriteriaExampleListItem icon={SentimentSatisfiedIcon} text={examples.exceeds} />
      <CriteriaExampleListItem icon={SentimentNeutralIcon} text={examples.expected} />
      <CriteriaExampleListItem icon={SentimentDissatisfiedIcon} text={examples.belowAverage} />
      <CriteriaExampleListItem icon={SentimentVeryDissatisfiedIcon} text={examples.underperformed} />
    </List>
  );
}
