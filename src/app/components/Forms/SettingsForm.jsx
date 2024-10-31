'use client';
import { Form } from 'react-bootstrap';
import { Nunito } from 'next/font/google';
import FormSection from '../Sections/FormSection';

const nunito = Nunito({
  weights: [700, 600, 400],
  subsets: ['latin'],
});

const SettingsForm = () => {
  return (
    <>
      <FormSection title="Change Email">
        <Form>
          <Form.Group className="flex flex-col">
            <Form.Label className={`text-base mb-2 ${nunito.className}`}>
              New Email Address
            </Form.Label>
            <Form.Label className={`text-base mb-2 ${nunito.className}`}>
              Confirm New Email Address
            </Form.Label>
            <button className={`${nunito.className}`}>Update Email</button>
          </Form.Group>
        </Form>
      </FormSection>

      <FormSection title="Change Password">
        <Form>
          <Form.Group className="flex flex-col">
            <Form.Label className={`text-base mb-2 ${nunito.className}`}>
              Current Password
            </Form.Label>
            <Form.Label className={`text-base mb-2 ${nunito.className}`}>
              New Password
            </Form.Label>
            <Form.Label className={`text-base mb-2 ${nunito.className}`}>
              Confirm New Password
            </Form.Label>
            <button className={`${nunito.className}`}>Update Password</button>
          </Form.Group>
        </Form>
      </FormSection>

      <FormSection title="Delete Account">
        <Form>
          <Form.Group className="flex flex-col">
            <button className={`${nunito.className}`}>Delete Account</button>
          </Form.Group>
        </Form>
      </FormSection>
    </>
  );
};

export default SettingsForm;
