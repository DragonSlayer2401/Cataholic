import { getReduxInitialState } from '@/lib/utils/fetchReduxInitialState';
import FavoriteCardsSection from '../components/Sections/FavoriteCardsSection';
import ReduxWrapper from '../components/Wrapper/ReduxWrapper';
import { redirect } from 'next/navigation';
import axios from 'axios';
import { cookies } from 'next/headers';

const getImages = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    // number of images to fetch
    const limit = 12;

    const response = await axios.get(
      `${process.env.BASE_URL}/api/users/favorites?limit=${limit}`,
      { withCredentials: true, headers: { Cookie: `token=${token}` } }
    );
    return response.data.favorites;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default async function Favorites() {
  const preloadedState = await getReduxInitialState();

  if (!preloadedState.auth.loggedIn) {
    redirect('/');
  }

  const images = await getImages();

  return (
    <>
      <ReduxWrapper preloadedState={preloadedState}>
        <main className="min-h-dvh">
          <FavoriteCardsSection
            title="Your Favorited Fur Babies"
            initialImages={images}
          />
        </main>
      </ReduxWrapper>
    </>
  );
}
