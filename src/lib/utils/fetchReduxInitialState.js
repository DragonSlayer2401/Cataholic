import { cookies } from 'next/headers';
import { verifyJWT } from './verifyJWT';
import { fetchFavorites } from './fetchFavorites';

export const getReduxInitialState = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  let loggedIn = false;
  let favorites = [];

  if (token) {
    loggedIn = verifyJWT(token);
    favorites = await fetchFavorites();
  }

  const preloadedState = {
    auth: {
      loggedIn,
      favorites,
    },
  };

  return preloadedState;
};
