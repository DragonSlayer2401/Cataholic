import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// Stores the Redux store to prevent multiple instances
let store;

const initializeStore = (preloadedState) => {
  if (store) {
    return store;
  }

  store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState,
  });

  return store;
};

export default initializeStore;
