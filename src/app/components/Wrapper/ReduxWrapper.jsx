'use client';
import { useStore } from '@/app/redux/store';
import axios from 'axios';
import { useEffect } from 'react';
import { Provider } from 'react-redux';

const ReduxWrapper = ({ children, preloadedState, oldToken }) => {
  if (!preloadedState) { 
    preloadedState = {
      auth: {
        loggedIn: false,
        email: '',
        favorites: [],
      },
    };
  }
  
  const reduxStore = useStore(preloadedState);

  useEffect(() => {
    const logoutUser = async () => {
      await axios.get('/api/users/auth/logout');
    };

    if (oldToken) {
      logoutUser();
    }
  }, [oldToken]);

  return <Provider store={reduxStore}>{children}</Provider>;
};

export default ReduxWrapper;
