import { satietyLevelLabel, garnishesLabel } from './labels';
const satietyLevel = {
  id: 'satietyLevel',
  title: satietyLevelLabel,
  description:
    'The degree at which food gives a human the sense of food gratification, how it satisfy the feelings of hunger',
  examples: {
    excellent: 'You do not need anything else, this is just the perfect quantity',
    exceeds: 'The price is on the average, but the quantity of food was higher',
    expected: 'It matches the average, you expected nothing more',
    belowAverage: 'The portion was to small for the given dish',
    underperformed: 'The price is high and the portion is very small',
  },
};

const garnishes = {
  id: 'garnishes',
  title: garnishesLabel,
  description:
    'What is your dish accompanied with, what and how many options does it offer and how is their quality',
  examples: {
    excellent: 'The garnishes by itself worth the dish',
    exceeds: 'The variety of them was outstanding, also their flavor',
    expected: 'It has the minium required to accompany the dish',
    belowAverage: 'They feel like fillings more than companions',
    underperformed: 'Bad flavor or inexistent',
  },
};

const criteriaGroup = {
  id: 'quantity',
  name: 'Quantity',
  criteria: [satietyLevel, garnishes],
};

export default criteriaGroup;
