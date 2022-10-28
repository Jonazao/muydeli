import { axiosBaseQuery } from '../apis/gateway';
import { getTagLists } from '../helpers/service-tag-list.helper';
import { createApi } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
const postTags = getTagLists('Post');

export const postApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    getPosts: build.query({
      query: () => ({ url: 'posts', method: 'GET' }),
      providesTags: (result) =>
        result ? postTags.getPaginatedListTagList(result.map(({ id }) => id)) : postTags.getListTagList(),
    }),
    addPost: build.mutation({
      query: (body) => ({
        url: `posts`,
        method: 'POST',
        body,
      }),
      invalidatesTags: postTags.getListTagList(),
    }),
    getPost: build.query({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => postTags.getOneTagList(),
    }),
    updatePost: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `posts/${id}`,
        method: 'PUT',
        body: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postApi.util.updateQueryData('getPost', id, (draft) => {
            Object.assign(draft, patch);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: (result, error, { id }) => postTags.getOneTagList(),
    }),
    deletePost: build.mutation({
      query(id) {
        return {
          url: `posts/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, id) => postTags.getOneTagList(),
    }),
  }),
});

export const {
  useGetPostQuery,
  useGetPostsQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
