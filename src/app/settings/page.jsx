import { getReduxInitialState } from '@/lib/utils/fetchReduxInitialState';
import NavBar from '../components/Header/NavBar';
import ReduxWrapper from '../components/Wrapper/ReduxWrapper';
import { redirect } from 'next/navigation';

export default async function Settings() {
    const preloadedState = await getReduxInitialState();
    
    if (!preloadedState.auth.loggedIn) {
        redirect('/');
    }

  return (
    <ReduxWrapper preloadedState={preloadedState}>
      <NavBar />
    </ReduxWrapper>
  );
}
