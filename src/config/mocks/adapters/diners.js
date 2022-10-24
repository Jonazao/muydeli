import diners from '../../data/diners';
import { extractIdPathParamFromUrl, createPaginationResponse } from '../../common/helpers';

const getDiners = (config) => {
  const { params } = config;
  const pageSize = params && params.pageSize ? params.pageSize : 10;
  const pageNumber = params && params.pageNumber ? params.pageNumber : 10;
  const paginationResult = createPaginationResponse(diners, {
    pageSize,
    pageNumber,
  });
  return [200, paginationResult];
};

const getDiner = (config) => {
  const id = extractIdPathParamFromUrl(config);
  const response = diners.find((diner) => diner.id === id);
  return [200, response];
};

const init = (mockAdapter) => {
  mockAdapter.onGet(/\/diners\//).reply(() => getDiners());
  mockAdapter.onGet(/\/diners\/\d+/).reply(() => getDiner());
};

const adapter = {
  init,
};

export default adapter;
