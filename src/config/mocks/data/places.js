import { faker } from '@faker-js/faker';

const createPlace = (id) => {
  const lat = 31.85 + 1 / faker.datatype.number({ min: 20, max: 50 });
  const lng = -116.59 + 1 / faker.datatype.number({ min: 12, max: 50 });
  return {
    id: id,
    name: faker.company.name(),
    address: {
      addressLine: faker.address.streetName(),
      lat,
      lng,
    },
    photos: {
      outsideFrontal: '',
      outsideSurroundings: '',
      entrance: '',
      interior: '',
    },
    availability: {
      parkingType: '',
      size: '',
    },
  };
};

const places = Array.from({ length: 35 }).map((item, index) => {
  return {
    ...createPlace(index),
    foodType: faker.datatype.number({ min: 0, max: 5 }),
    priceRange: faker.datatype.number({ min: 1, max: 4 }),
    numberOfReviews: faker.datatype.number({ min: 0, max: 12 }),
    mostReviewedDish: faker.commerce.productName(),
  };
});

export default places;
