import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { useMemo } from 'react';

// Create the Redux store
const initStore = (preloadedState) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState,
  });
};

const initializeStore = (preloadedState) => {
  // Returns the right value when the left value is null
  // Will create a new store on the server and use existing store on the client
  let _store = store ?? initStore(preloadedState);

  if (typeof window === 'undefined') return _store;

  if (!store) store = _store;

  return store;
};

export const useStore = (preloadedState) => { 
  const store = useMemo(() => initializeStore(preloadedState), [preloadedState]);
  return store;
};

let store;
