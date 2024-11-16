import { cookies } from 'next/headers';
import { verifyJWT } from './verifyJWT';
import { fetchEmail } from './fetchEmail';

export const getReduxInitialState = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  let loggedIn = false;
  let email = '';

  if (token) {
    loggedIn = verifyJWT(token);
    email = await fetchEmail();
  }

  const preloadedState = {
    auth: {
      loggedIn,
      email,
    },
  };

  return preloadedState;
};
