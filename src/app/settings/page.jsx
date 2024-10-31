import { getReduxInitialState } from '@/lib/utils/fetchReduxInitialState';
import NavBar from '../components/Header/NavBar';
import ReduxWrapper from '../components/Wrapper/ReduxWrapper';
import { redirect } from 'next/navigation';
import FormSection from '../components/Sections/FormSection';
import GeneralSection from '../components/Sections/GeneralSection';

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
          <FormSection title="Change Email" type="input" />
          <FormSection title="Change Password" type="input" />
          <FormSection title="Delete Account" type="button" />
        </GeneralSection>
      </main>
    </>
  );
}
