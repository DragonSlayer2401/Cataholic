import { getReduxInitialState } from '@/lib/utils/fetchReduxInitialState';
import NavBar from '../components/Header/NavBar';
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
    <ReduxWrapper preloadedState={preloadedState}>
      <NavBar />
      <FavoriteCardsSection title="Favorites" initialImages={images} />
    </ReduxWrapper>
  );
}
