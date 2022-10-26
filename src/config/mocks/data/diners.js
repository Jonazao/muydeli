import { faker } from '@faker-js/faker';
const numberOfReviews = 27;

const diners = [
  {
    id: 1,
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
        photoUrl: faker.image.food(293, 293),
        dish: {
          name: faker.random.words(3),
        },
      };
    }),
  },
];

export default diners;
