import { verifyJWT } from '@/lib/utils/verifyJWT';
import ForgotPasswordForm from '../components/Forms/ForgotPasswordForm';
import GeneralSection from '../components/Sections/GeneralSection';
import { redirect } from 'next/navigation';

export default async function ForgotPassword({ searchParams }) {
  const params = await searchParams;
  const token = params?.token;

  if (token) {
    const success = verifyJWT(token);

    if (!success) {
      redirect('/');
    }
  }

  return (
    <>
      <main className="min-h-dvh">
        <GeneralSection title="Forgot Password">
          <ForgotPasswordForm type={token ? 'reset' : 'forgot'} token={token} />
        </GeneralSection>
      </main>
    </>
  );
}
