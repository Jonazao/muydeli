import { configureStore } from '@reduxjs/toolkit';
import { useAuthServer } from '../config/configureTemplate';

// Slices
import authReducer from '../features/auth/authSlice';
import modalReducer from '../features/config/modalSlice';

//Services
import { postApi } from '../services/post';
import { dinersApi } from '../services/diners';
import { reviewApi } from '../services/review';
import { placesApi } from '../services/places';

const auth = useAuthServer ? authReducer : null;

// This will throw a runtime error if no other reducer is present
export const store = configureStore({
  reducer: {
    auth,
    modal: modalReducer,
    [postApi.reducerPath]: postApi.reducer,
    [dinersApi.reducerPath]: dinersApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [placesApi.reducerPath]: placesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(postApi.middleware)
      .concat(dinersApi.middleware)
      .concat(reviewApi.middleware)
      .concat(placesApi.middleware),
});
