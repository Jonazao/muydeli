import { extractIdPathParamFromUrl, createPaginationResponse } from '../common/helpers';
import dishes from '../data/dishes';

const getDish = (config) => {
  console.log('getDish mock');
  const pathParams = extractIdPathParamFromUrl(config, ['dish']);
  const id = parseInt(pathParams['dish'], 10);
  const response = dishes.find((dish) => dish.id === id);
  return [200, response];
};

const getDishes = (config) => {
  console.log('getDishes mock');
  const { params } = config;
  const pageSize = params && params.pageSize ? params.pageSize : 10;
  const pageNumber = params && params.pageNumber ? params.pageNumber : 1;
  const paginationResult = createPaginationResponse(dishes, {
    pageSize,
    pageNumber,
  });
  return [200, paginationResult];
};

const init = (mockAdapter) => {
  // Dish Resource
  mockAdapter.onGet(/\/dishes\/\d+/).reply((config) => getDish(config));
  mockAdapter.onGet(/dishes/).reply((config) => getDishes(config));
};

const adapter = {
  init,
};

export default adapter;
