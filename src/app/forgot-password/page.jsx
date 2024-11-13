import ForgotPasswordForm from '../components/Forms/ForgotPasswordForm';
import GeneralSection from '../components/Sections/GeneralSection';

export default async function ForgotPassword({ searchParams }) {
  const params = await searchParams;
  const token = params?.token;

  return (
    <>
      <main className="min-h-dvh">
        <GeneralSection title="Forgot Password">
          <ForgotPasswordForm type={token ? 'reset' : 'forgot'} />
        </GeneralSection>
      </main>
    </>
  );
}
