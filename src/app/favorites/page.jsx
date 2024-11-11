import { getReduxInitialState } from '@/lib/utils/fetchReduxInitialState';
import FavoriteCardsSection from '../components/Sections/FavoriteCardsSection';
import ReduxWrapper from '../components/Wrapper/ReduxWrapper';
import { redirect } from 'next/navigation';

export default async function Favorites() {
  const preloadedState = await getReduxInitialState();

  if (!preloadedState.auth.loggedIn) {
    redirect('/');
  }

  const images = preloadedState.auth.favorites;

  return (
    <>
      <ReduxWrapper preloadedState={preloadedState}>
        <main className='min-h-dvh'>
          <FavoriteCardsSection title="Your Favorited Fur Babies" initialImages={images} />
        </main>
      </ReduxWrapper>
    </>
  );
}
