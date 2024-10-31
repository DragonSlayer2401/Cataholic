import { cookies } from 'next/headers';
import { verifyJWT } from './verifyJWT';
import { fetchFavorites } from './fetchFavorites';
import { fetchEmail } from './fetchEmail';

export const getReduxInitialState = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  let loggedIn = false;
  let email = '';
  let favorites = [];

  if (token) {
    loggedIn = verifyJWT(token);
    favorites = await fetchFavorites();
    email = await fetchEmail();
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
