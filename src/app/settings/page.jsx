import { getReduxInitialState } from '@/lib/utils/fetchReduxInitialState';
import NavBar from '../components/Header/NavBar';
import ReduxWrapper from '../components/Wrapper/ReduxWrapper';
import { redirect } from 'next/navigation';
import FormSection from '../components/Sections/FormSection';
import GeneralSection from '../components/Sections/GeneralSection';
import { Form, FormGroup, FormLabel } from 'react-bootstrap';
import { Nunito } from 'next/font/google';
import SettingsForm from '../components/Forms/SettingsForm';

const nunito = Nunito({
  weights: [700, 600, 400],
  subsets: ['latin'],
});

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
          <SettingsForm />
        </GeneralSection>
      </main>
    </>
  );
}
