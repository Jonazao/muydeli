import { faker } from '@faker-js/faker';

const reviews = Array.from({ length: 2 }).map((item, index) => {
  return {
    id: index,
    reviewDate: new Date(faker.date.past()).toUTCString(),
    reviewer: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      photoUrl: faker.image.avatar(),
    },

    dish: {
      name: faker.commerce.productName(),
      type: faker.commerce.productMaterial(),
      photoUrl: faker.image.food(),
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
});

export default reviews;
