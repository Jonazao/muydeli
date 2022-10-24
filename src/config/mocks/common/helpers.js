import PageResult from './PageResult';

export const extractIdPathParamFromUrl = (config) => {
  return config.url.split('/').pop();
};

export const createPaginationResponse = (data, filters) => {
  const { pageSize, pageNumber } = filters;
  const result = data.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  const pagination = new PageResult(data.length, pageSize, pageNumber);
  pagination.setUrls(pagination);
  return {
    result,
    pagination,
  };
};
