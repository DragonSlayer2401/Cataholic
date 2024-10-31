'use client';
import { Form } from 'react-bootstrap';
import { Nunito } from 'next/font/google';
import FormSection from '../Sections/FormSection';
import { useForm } from 'react-hook-form';
import { FaEye } from 'react-icons/fa6';
import { PiEyeClosedBold } from 'react-icons/pi';
import './form.css';
import { useDispatch, useSelector } from 'react-redux';

const nunito = Nunito({
  weights: [700, 600, 400],
  subsets: ['latin'],
});

const SettingsForm = () => {
  const currentEmail = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch('password');
  const email = watch('email');

  return (
    <div id="settings-form">
      <FormSection title="Change Email">
        <Form>
          <Form.Group className="mb-4">
            <Form.Label
              htmlFor="current-email"
              className={`text-base font-bold ${nunito.className}`}
            >
              Current Email
            </Form.Label>
            <Form.Control
              type="email"
              id="current-email"
              name="currentemail"
              readOnly
              value={currentEmail}
              disabled
              className={`text-base p-3 border cursor-not-allowed ${nunito.className}`}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label
              htmlFor="email"
              className={`text-base font-bold ${nunito.className}`}
            >
              New Email
            </Form.Label>
            <Form.Control
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              aria-invalid={errors.email ? 'true' : 'false'}
              className={`text-base p-3 border ${nunito.className}`}
              {...register('email', {
                required: 'New Email address is required',
                pattern: {
                  value:
                    /^(?![_.-])[a-zA-Z0-9._%+-]{1,64}(?<![_.-])@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && (
              <Form.Text
                aria-live="polite"
                role="alert"
                className={`text-red-500 mt-2 font-bold !text-sm ${nunito.className}`}
              >
                {errors.email.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label
              htmlFor="confirm-email"
              className={`text-base font-bold ${nunito.className}`}
            >
              Confirm New Email
            </Form.Label>
            <Form.Control
              type="email"
              id="confirm-email"
              name="confirmEmail"
              placeholder="Enter your email"
              aria-invalid={errors.confirmEmail ? 'true' : 'false'}
              className={`text-base p-3 border ${nunito.className}`}
              {...register('confirmEmail', {
                required: 'Confirm New Email address is required',
                validate: (value) => value === email || 'Emails do not match',
              })}
            />
            {errors.confirmEmail && (
              <Form.Text
                aria-live="polite"
                role="alert"
                className={`text-red-500 mt-2 font-bold !text-sm ${nunito.className}`}
              >
                {errors.confirmEmail.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group>
            <button
              className={`text-base py-3 px-4 font-bold w-full rounded-3xl text-white ${nunito.className}`}
            >
              Update Email
            </button>
          </Form.Group>
        </Form>
      </FormSection>

      <FormSection title="Change Password">
        <Form>
          <Form.Group className="mb-4">
            <Form.Label className={`text-base font-bold ${nunito.className}`}>
              Current Password
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className={`text-base font-bold ${nunito.className}`}>
              New Password
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className={`text-base font-bold ${nunito.className}`}>
              Confirm New Password
            </Form.Label>
          </Form.Group>
          <Form.Group className="mb-4">
            <button
              className={`text-base py-3 px-4 font-bold w-full rounded-3xl text-white ${nunito.className}`}
            >
              Update Password
            </button>
          </Form.Group>
        </Form>
      </FormSection>

      <FormSection title="Delete Account">
        <Form>
          <Form.Group className="flex flex-col">
            <button
              className={`text-base py-3 px-4 font-bold w-full rounded-3xl text-white ${nunito.className}`}
            >
              Delete Account
            </button>
          </Form.Group>
        </Form>
      </FormSection>
    </div>
  );
};

export default SettingsForm;
