import { createPaginationResponse, extractIdPathParamFromUrl } from '../common/helpers';
import reviews from '../data/reviews';

const getReview = (config) => {
  console.log('getReview mock');
  const pathParams = extractIdPathParamFromUrl(config, ['review']);
  const id = parseInt(pathParams['review'], 10);
  const response = reviews.find((review) => review.id === id);
  return [200, response];
};

const getReviews = (config) => {
  console.log('getReviews mock');
  const { params } = config;
  const pageSize = params && params.pageSize ? params.pageSize : 10;
  const pageNumber = params && params.pageNumber ? params.pageNumber : 1;
  const paginationResult = createPaginationResponse(reviews, {
    pageSize,
    pageNumber,
  });
  return [200, paginationResult];
};

const createReview = (config) => {
  return [200, null];
};

const init = (mockAdapter) => {
  // Review Resource
  mockAdapter.onGet(/\/reviews\/\d+/).reply((config) => getReview(config));
  mockAdapter.onGet(/reviews/).reply((config) => getReviews(config));
  mockAdapter.onPost(/reviews/).reply((config) => createReview(config));
};

const adapter = {
  init,
};

export default adapter;
