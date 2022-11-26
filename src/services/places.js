import { axiosBaseQuery } from '../apis/gateway';
import { getTagLists } from '../helpers/service-tag-list.helper';
import { createApi } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
const resourceName = 'places';
const placeTags = getTagLists(resourceName);

export const placesApi = createApi({
  reducerPath: `${resourceName}Api`,
  baseQuery: axiosBaseQuery(),
  tagTypes: [resourceName],
  endpoints: (build) => ({
    getPlaces: build.query({
      query: ({ params }) => ({ url: resourceName, method: 'GET', params }),
      providesTags: (response) => {
        const { result } = response;
        return result ? placeTags.getPaginatedListTagList(result.map(({ id }) => id)) : placeTags.getListTagList();
      },
    }),
    addPlace: build.mutation({
      query: (body) => ({
        url: resourceName,
        method: 'POST',
        body,
      }),
      invalidatesTags: placeTags.getListTagList(),
    }),
    getPlace: build.query({
      query: (id) => ({ url: `${resourceName}/${id}`, method: 'GET' }),
      providesTags: (result, error, id) => placeTags.getOneTagList(),
    }),
    updatePlace: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `${resourceName}/${id}`,
        method: 'PUT',
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          placesApi.util.updateQueryData('getPlace', id, (draft) => {
            Object.assign(draft, patch);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => placeTags.getOneTagList(),
    }),
    deletePlace: build.mutation({
      query(id) {
        return {
          url: `${resourceName}/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, id) => placeTags.getOneTagList(),
    }),
    getPlaceReviews: build.query({
      query: ({ id, params }) => {
        return { url: `${resourceName}/${id}/reviews`, method: 'GET', params };
      },
      providesTags: (response) => {
        const { result } = response;
        return result ? placeTags.getPaginatedListTagList(result.map(({ id }) => id)) : placeTags.getListTagList();
      },
    }),
  }),
});

export const {
  useGetPlaceQuery,
  useGetPlacesQuery,
  useAddPlaceMutation,
  useUpdatePlaceMutation,
  useDeletePlaceMutation,
  useGetPlaceReviewsQuery,
  useLazyGetPlacesQuery,
} = placesApi;
