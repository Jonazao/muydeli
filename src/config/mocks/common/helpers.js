import PageResult from './PageResult';

export const extractIdPathParamFromUrl = (config, params) => {
  const splitedUrl = config.url.split('/');
  let pathParms = {};
  params.forEach((param) => {
    const paramIndex = splitedUrl.findIndex((urlFragment) => urlFragment === param);
    const paramValue = splitedUrl[paramIndex + 1];
    if (paramValue) {
      pathParms[param] = paramValue;
    }
  });
  return pathParms;
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
