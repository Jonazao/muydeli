import diners from '../data/diners';
import { extractIdPathParamFromUrl, createPaginationResponse } from '../common/helpers';

const getDiners = (config) => {
  console.log('getDiners mock');
  const { params } = config;
  const pageSize = params && params.pageSize ? params.pageSize : 10;
  const pageNumber = params && params.pageNumber ? params.pageNumber : 1;
  const paginationResult = createPaginationResponse(diners, {
    pageSize,
    pageNumber,
  });
  return [200, paginationResult];
};

const getDiner = (config) => {
  console.log('getDiner mock');
  const pathParams = extractIdPathParamFromUrl(config, ['diners']);
  const id = parseInt(pathParams['diners'], 10);
  const response = diners.find((diner) => diner.id === id);
  return [200, response];
};

const getDinerReviews = (config) => {
  console.log('getDinerReviews mock');
  const pathParams = extractIdPathParamFromUrl(config, ['diners']);
  const id = parseInt(pathParams['diners'], 10);
  const { params } = config;
  const pageSize = params && params.pageSize ? params.pageSize : 10;
  const pageNumber = params && params.pageNumber ? params.pageNumber : 1;
  const diner = diners.find((diner) => diner.id === id);
  const { reviews } = diner;
  const paginationResult = createPaginationResponse(reviews, {
    pageSize,
    pageNumber,
  });
  return [200, paginationResult];
};

const init = (mockAdapter) => {
  // Diners Reviews Resource
  mockAdapter.onGet(/\/diners\/\d+\/reviews/).reply((config) => getDinerReviews(config));

  // Diners Resource
  mockAdapter.onGet(/\/diners\/\d+/).reply((config) => getDiner(config));
  mockAdapter.onGet(/diners/).reply((config) => getDiners(config));
};

const adapter = {
  init,
};

export default adapter;
