import labelsCriteria from './labels';

const { expectationsLabel, flavorLabel } = labelsCriteria;
const expectation = {
  title: expectationsLabel,
  description: 'Based on the essence of the dish what is delivered',
  examples: {
    excellent:
      'The price was lower than average, the flavor outstanding, it is just amazing',
    exceeds: 'Better quality, price and flavor than average',
    expected: 'It matches the average, this is what you came for',
    belowAverage: 'It sounded/looked better than it is',
    underperformed: 'The price is high, and the taste is below average',
  },
};

const flavor = {
  title: flavorLabel,
  description:
    'The taste of the food, the umami, what makes you enjoy what you eat',
  examples: {
    excellent: 'It worth completely, you would not doubt in order it again',
    exceeds: 'The flavor was premium quality, would be on your top of the city',
    expected:
      'It matches the average, you can find similar dishes for similar prices in other places',
    belowAverage: 'The flavor was good, but not enough to order it again',
    underperformed: 'The price is high and the taste is low quality',
  },
};

const criteriaGroup = {
  name: 'Taste',
  criteria: [expectation, flavor],
};

export default criteriaGroup;
