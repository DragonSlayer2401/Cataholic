'use client';
import initializeStore from '@/app/redux/store';
import { Provider } from 'react-redux';

const ReduxWrapper = ({ children, preloadedState }) => {
    const reduxStore = initializeStore(preloadedState);
  return <Provider store={reduxStore}>{children}</Provider>;
};

export default ReduxWrapper;
