import { cookies } from 'next/headers';
import axios from 'axios';

export const fetchEmail = async () => {
  try {
    let response;

    if (typeof window === 'undefined') {
      const cookieStore = await cookies();
      const allCookies = cookieStore.getAll();
      const cookieHeader = allCookies
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join('; ');

      response = await axios.get(`${process.env.BASE_URL}/api/users`, {
        headers: {
          Cookie: cookieHeader,
        },
        withCredentials: true,
      });
    } else {
      response = await axios.get(`/api/users`, {
        withCredentials: true,
      });
    }
    return response.data.email;
  } catch (error) {
    if (error.response?.status === 404 || error.response?.status === 401) {
      return '';
    }
    console.error(error);
    return '';
  }
};
