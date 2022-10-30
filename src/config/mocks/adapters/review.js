import { createPaginationResponse, extractIdPathParamFromUrl } from '../common/helpers';
import review from '../data/review';

const getReview=(config)=>{
    console.log('getReview mock');
    const pathParams = extractIdPathParamFromUrl(config, ['review']);
    const id = parseInt(pathParams['review'], 10);
    const response = review.find((review) => review.id === id);
    return [200, response];
}

const getReviews=(config)=>{
    console.log('getReviews mock');
    const { params } = config;
    const pageSize = params && params.pageSize ? params.pageSize : 10;
    const pageNumber = params && params.pageNumber ? params.pageNumber : 1;
    const paginationResult = createPaginationResponse(review, {
        pageSize,
        pageNumber,
    });
    return [200, paginationResult];
}

const init = (mockAdapter) => {
    // Review Resource
    mockAdapter.onGet(/\/home\/\d+/).reply((config) => getReview(config));
    mockAdapter.onGet(/home/).reply((config) => getReviews(config));
  };
  
  const adapter = {
    init,
  };
  
  export default adapter;