import { axiosBaseQuery } from '../apis/gateway';
import { getTagLists } from '../helpers/service-tag-list.helper';
import { createApi } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
const resourceName = 'diners';
const dinerTags = getTagLists(resourceName);

export const dinersApi = createApi({
  reducerPath: `${resourceName}Api`,
  baseQuery: axiosBaseQuery(),
  tagTypes: [resourceName],
  endpoints: (build) => ({
    getDiners: build.query({
      query: () => ({ url: resourceName, method: 'GET' }),
      providesTags: (response) => {
        const { result } = response;
        return result ? dinerTags.getPaginatedListTagList(result.map(({ id }) => id)) : dinerTags.getListTagList();
      },
    }),
    addDiner: build.mutation({
      query: (body) => ({
        url: resourceName,
        method: 'POST',
        body,
      }),
      invalidatesTags: dinerTags.getListTagList(),
    }),
    getDiner: build.query({
      query: (id) => ({ url: `${resourceName}/${id}`, method: 'GET' }),
      providesTags: (result, error, id) => dinerTags.getOneTagList(),
    }),
    updateDiner: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `${resourceName}/${id}`,
        method: 'PUT',
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          dinersApi.util.updateQueryData('getDiner', id, (draft) => {
            Object.assign(draft, patch);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => dinerTags.getOneTagList(),
    }),
    deleteDiner: build.mutation({
      query(id) {
        return {
          url: `${resourceName}/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, id) => dinerTags.getOneTagList(),
    }),
    getDinerReviews: build.query({
      query: ({ id, params }) => {
        return { url: `${resourceName}/${id}/reviews`, method: 'GET', params };
      },
      providesTags: (response) => {
        const { result } = response;
        return result ? dinerTags.getPaginatedListTagList(result.map(({ id }) => id)) : dinerTags.getListTagList();
      },
    }),
  }),
});

export const {
  useGetDinerQuery,
  useGetDinersQuery,
  useAddDinerMutation,
  useUpdateDinerMutation,
  useDeleteDinerMutation,
  useGetDinerReviewsQuery,
  useLazyGetDinerReviewsQuery,
} = dinersApi;
