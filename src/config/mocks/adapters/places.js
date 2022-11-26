import rawPlaces from '../data/places';
import { extractIdPathParamFromUrl, createPaginationResponse } from '../common/helpers';
const places = rawPlaces.sort((a, b) => a.name.localeCompare(b.name));

const getPlaces = (config) => {
  console.log('getPlaces mock');
  const { params } = config;
  const pageSize = params && params.pageSize ? params.pageSize : 10;
  const pageNumber = params && params.pageNumber ? params.pageNumber : 1;
  const searchText = params && params.searchText ? params.searchText : null;
  const filteredPlaces = searchText
    ? places.filter((place) => place.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
    : places;
  const paginationResult = createPaginationResponse(filteredPlaces, {
    pageSize,
    pageNumber,
  });
  return [200, paginationResult];
};

const getPlace = (config) => {
  console.log('getPlace mock');
  const pathParams = extractIdPathParamFromUrl(config, ['places']);
  const id = parseInt(pathParams['places'], 10);
  const response = places.find((place) => place.id === id);
  return [200, response];
};

const getPlaceReviews = (config) => {
  console.log('getPlaceReviews mock');
  const pathParams = extractIdPathParamFromUrl(config, ['places']);
  const id = parseInt(pathParams['places'], 10);
  const { params } = config;
  const pageSize = params && params.pageSize ? params.pageSize : 10;
  const pageNumber = params && params.pageNumber ? params.pageNumber : 1;
  const place = places.find((place) => place.id === id);
  const { reviews } = place;
  const paginationResult = createPaginationResponse(reviews, {
    pageSize,
    pageNumber,
  });
  return [200, paginationResult];
};

const init = (mockAdapter) => {
  // Places Reviews Resource
  mockAdapter.onGet(/\/places\/\d+\/reviews/).reply((config) => getPlaceReviews(config));

  // Places Resource
  mockAdapter.onGet(/\/places\/\d+/).reply((config) => getPlace(config));
  mockAdapter.onGet(/places/).reply((config) => getPlaces(config));
};

const adapter = {
  init,
};

export default adapter;
