import { firstImpressionLabel, platingLabel } from './labels';

const firstImpression = {
  id: 'firstImpression',
  title: firstImpressionLabel,
  description: 'How you feel when you got your dish serve',
  examples: {
    excellent: 'It was just amazing, the smell, the look, the whole dish was outstanding',
    exceeds: 'Well presented, looks and smells better than expected',
    expected: 'It matches the average, this is what you came for',
    belowAverage: 'Bad presentation, looks awkward',
    underperformed: 'Complete mess, do not look appetizing',
  },
};

const plating = {
  id: 'plating',
  title: platingLabel,
  description: 'How the distribution and the cutlery relates to the experience',
  examples: {
    excellent: 'Every piece had its reason, the quality of the detail was amazing',
    exceeds: 'It was very enjoyable to eat, everything was on harmony',
    expected: 'It matches the average, the plate was well organized',
    belowAverage: 'Ingredients mess up, some placements only serves for good looking but made it hard to eat',
    underperformed: 'I had a hard time eating the dish, not willing to suffer that again',
  },
};

const criteriaGroup = {
  id: 'presentation',
  name: 'Presentation',
  criteria: [firstImpression, plating],
};

export default criteriaGroup;
