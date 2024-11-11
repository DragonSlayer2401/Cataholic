'use client';
import { useStore } from '@/app/redux/store';
import { Provider } from 'react-redux';

const ReduxWrapper = ({ children, preloadedState }) => {
  const reduxStore = useStore(preloadedState);
  return <Provider store={reduxStore}>{children}</Provider>;
};

export default ReduxWrapper;
