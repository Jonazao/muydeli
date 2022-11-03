import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { axiosBaseQuery } from '../apis/gateway';
import { getTagLists } from '../helpers/service-tag-list.helper';

const resourceName = 'reviews';
const reviewTags = getTagLists(resourceName);

export const reviewApi = createApi({
  reducerPath: `${resourceName}Api`,
  baseQuery: axiosBaseQuery(),
  tagTypes: [resourceName],
  endpoints: (build) => ({
    getReview: build.query({
      query: () => ({ url: resourceName, method: 'GET' }),
      providesTags: (result, error, id) => reviewTags.getOneTagList(),
    }),
    getReviews: build.query({
      query: () => ({ url: resourceName, method: 'GET' }),
      providesTags: (response) => {
        const { result } = response;
        return result
          ? reviewTags.getPaginatedListTagList(result.map(({ id }) => id))
          : reviewTags.getListTagList();
      },
    }),
  }),
});

export const { useGetReviewQuery, useGetReviewsQuery } = reviewApi;
