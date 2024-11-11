import { getReduxInitialState } from '@/lib/utils/fetchReduxInitialState';
import ReduxWrapper from '../components/Wrapper/ReduxWrapper';
import { redirect } from 'next/navigation';
import GeneralSection from '../components/Sections/GeneralSection';
import SettingsForm from '../components/Forms/SettingsForm';

export default async function Settings() {
  const preloadedState = await getReduxInitialState();

  if (!preloadedState.auth.loggedIn) {
    redirect('/');
  }

  return (
    <>
      <main>
        <GeneralSection title="Account Settings">
          <ReduxWrapper>
            <SettingsForm />
          </ReduxWrapper>
        </GeneralSection>
      </main>
    </>
  );
}
