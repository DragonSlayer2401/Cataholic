import { getReduxInitialState } from '@/lib/utils/fetchReduxInitialState';
import NavBar from '../components/Header/NavBar';
import ReduxWrapper from '../components/Wrapper/ReduxWrapper';
import { redirect } from 'next/navigation';
import GeneralSection from '../components/Sections/GeneralSection';
import SettingsForm from '../components/Forms/SettingsForm';
import Footer from '../components/Footer/Footer';

export default async function Settings() {
  const preloadedState = await getReduxInitialState();

  if (!preloadedState.auth.loggedIn) {
    redirect('/');
  }

  return (
    <>
      <ReduxWrapper preloadedState={preloadedState}>
        <NavBar />
      </ReduxWrapper>
      <main>
        <GeneralSection title="Account Settings">
          <ReduxWrapper preloadedState={preloadedState}>
            <SettingsForm />
          </ReduxWrapper>
        </GeneralSection>
      </main>
      <Footer />
    </>
  );
}
