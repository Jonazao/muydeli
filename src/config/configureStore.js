import { configureStore } from '@reduxjs/toolkit';
import { useAuthServer } from '../config/configureTemplate';

// Slices
import authReducer from '../features/auth/authSlice';

//Services
import { postApi } from '../services/post';
import { dinersApi } from '../services/diners';

const auth = useAuthServer ? authReducer : null;

// This will throw a runtime error if no other reducer is present
export const store = configureStore({
  reducer: {
    auth,
    [postApi.reducerPath]: postApi.reducer,
    [dinersApi.reducerPath]: dinersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware).concat(dinersApi.middleware),
});
