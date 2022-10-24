import { axiosBaseQuery } from '../apis/gateway';
import { getTagLists } from '../helpers/service-tag-list.helper';
import { createApi } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
const resourceName = 'Diners';
const dinersTags = getTagLists(resourceName);

export const dinersApi = createApi({
  baseQuery: axiosBaseQuery(),
  tagTypes: [resourceName],
  endpoints: (build) => ({
    getDiners: build.query({
      query: () => ({ url: 'diners', method: 'GET' }),
      providesTags: (result) =>
        result ? dinersTags.getPaginatedListTagList(result.map(({ id }) => id)) : dinersTags.getListTagList(),
    }),
    addDiner: build.mutation({
      query: (body) => ({
        url: `${resourceName.toLocaleLowerCase()}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: dinersTags.getListTagList(),
    }),
    getDiner: build.query({
      query: (id) => `${resourceName.toLocaleLowerCase()}/${id}`,
      providesTags: (result, error, id) => dinersTags.getOneTagList(),
    }),
    updateDiner: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `${resourceName.toLocaleLowerCase()}/${id}`,
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
      invalidatesTags: (result, error, { id }) => dinersTags.getOneTagList(),
    }),
    deleteDiner: build.mutation({
      query(id) {
        return {
          url: `${resourceName.toLocaleLowerCase()}/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, id) => dinersTags.getOneTagList(),
    }),
  }),
});

export const {
  useGetDinerQuery,
  useGetDinersQuery,
  useAddDinerMutation,
  useUpdateDinerMutation,
  useDeleteDinerMutation,
} = dinersApi;
