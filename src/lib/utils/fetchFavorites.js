import { cookies } from 'next/headers';
import axios from 'axios';

export const fetchFavorites = async () => {
  try {
    let response;

    if (typeof window === 'undefined') {
      const cookieStore = cookies();
      const allCookies = cookieStore.getAll();
      const cookieHeader = allCookies
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join('; ');

      response = await axios.get(
        `${process.env.BASE_URL}/api/users/favorites`,
        {
          headers: {
            Cookie: cookieHeader,
          },
          withCredentials: true,
        }
      );
    } else {
      response = await axios.get(`/api/users/favorites`, {
        withCredentials: true,
      });
    }

    return response.data.favorites;
  } catch (error) {
    console.error(error);
    return [];
  }
};
