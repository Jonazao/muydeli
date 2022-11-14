import { faker } from '@faker-js/faker';

export const createReview = (id) => {
  return {
    id: id,
    reviewDate: new Date(faker.date.past()).toUTCString(),
    reviewer: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      photoUrl: faker.image.avatar(),
    },
    dish: {
      name: faker.commerce.productName(),
      type: faker.commerce.productMaterial(),
      photoUrl: faker.image.food(650, 293, true),
    },
    restaurantName: faker.company.name(),
    finalScore: faker.datatype.number({ min: 0, max: 5 }),
    scores: {
      taste: {
        expectations: faker.datatype.number({ min: 0, max: 5 }),
        flavor: faker.datatype.number({ min: 0, max: 5 }),
      },
      presentation: {
        firstImpression: faker.datatype.number({ min: 0, max: 5 }),
        plating: faker.datatype.number({ min: 0, max: 5 }),
      },
      quantity: {
        satietyLevel: faker.datatype.number({ min: 0, max: 5 }),
        garnishes: faker.datatype.number({ min: 0, max: 5 }),
      },
    },
  };
};

const reviews = Array.from({ length: 9 }).map((item, index) => {
  return createReview(index);
});

export default reviews;
