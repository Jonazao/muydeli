import axios from 'axios';
import { initializeAxiosMockAdapter, isMockEnabled } from '../config/configureMocks';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_GATEWAY_API_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

if (isMockEnabled()) {
  console.log('Mock is Enabled');
  initializeAxiosMockAdapter(instance);
}

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params }) => {
    try {
      console.log({ url: baseUrl + url, method, data, params });
      const result = await instance({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      console.log(err);
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
