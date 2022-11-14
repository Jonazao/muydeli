import { faker } from '@faker-js/faker';
import { createReview } from './reviews';

const numberOfReviews = 57;

const diners = Array.from({ length: 24 }).map((item, index) => {
  return {
    id: index,
    photoUrl: faker.image.avatar(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    title: faker.name.jobTitle(),
    info: {
      summary: faker.lorem.lines(),
      description: faker.lorem.paragraphs(),
    },
    contributions: {
      places: 3,
      reviews: numberOfReviews,
      comments: 25,
    },
    reviews: Array.from({ length: numberOfReviews }).map((item, index) => {
      return createReview(index);
    }),
  };
});

export default diners;
