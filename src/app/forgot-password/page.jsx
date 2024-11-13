import ForgotPasswordForm from '../components/Forms/ForgotPasswordForm';
import GeneralSection from '../components/Sections/GeneralSection';

export default async function Search({ searchParams }) {
  return (
    <>
      <main className="min-h-dvh">
        <GeneralSection title="Forgot Password">
          <ForgotPasswordForm />
        </GeneralSection>
      </main>
    </>
  );
}
