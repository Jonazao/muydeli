import { faker } from '@faker-js/faker';

const createDish = (id) => {
  return {
    id: id,
    name: faker.commerce.product(),
    type: faker.commerce.productMaterial(),
    foodType: faker.commerce.productMaterial(),
  };
};

const dishes = Array.from({ length: 5 }).map((item, index) => {
  return createDish(index);
});

export default dishes;
