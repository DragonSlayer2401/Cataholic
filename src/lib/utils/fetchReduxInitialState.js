import { cookies } from 'next/headers';
import { verifyJWT } from './verifyJWT';
import { fetchFavorites } from './fetchFavorites';
import { fetchEmail } from './fetchEmail';
import axios from 'axios';

export const getReduxInitialState = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  let loggedIn = false;
  let email = '';
  let favorites = [];

  if (token) {
    email = await fetchEmail();

    if (!email) {
      return null;
    }

    loggedIn = verifyJWT(token);
    favorites = await fetchFavorites();
  }

  const preloadedState = {
    auth: {
      loggedIn,
      email,
      favorites,
    },
  };

  return preloadedState;
};
