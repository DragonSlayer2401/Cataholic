import { cookies } from 'next/headers';
import { verifyJWT } from './verifyJWT';
import { fetchFavorites } from './fetchFavorites';
import { fetchEmail } from './fetchEmail';

export const getReduxInitialState = async () => {
  const email = await fetchEmail();

  if (!email) {
    return { auth: { loggedIn: false, email: '', favorites: [] } };
  }

  const cookieStore = await cookies();
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
      email,
      favorites,
    },
  };

  return preloadedState;
};
