import { faker } from '@faker-js/faker';
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
    reviews: Array.from({ length: numberOfReviews }).map(() => {
      return {
        id: faker.datatype.uuid(),
        photoUrl: faker.image.food(650, 293, true),
        dish: {
          name: faker.random.words(3),
        },
      };
    }),
  };
});

export default diners;
