'use client';
import { Form } from 'react-bootstrap';
import { Nunito } from 'next/font/google';
import FormSection from '../Sections/FormSection';
import { useForm } from 'react-hook-form';
import { FaEye } from 'react-icons/fa6';
import { PiEyeClosedBold } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setLoggedIn, setFavorites } from '@/app/redux/authSlice';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import './form.css';
import { useRouter } from 'next/navigation';
import ConfirmationModal from '../Modals/ConfirmationModal';
import DOMPurify from 'isomorphic-dompurify';

const nunito = Nunito({
  weights: [700, 600, 400],
  subsets: ['latin'],
});

const SettingsForm = () => {
  const currentEmail = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
    currentPassword: false,
  });
  const router = useRouter();

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    watch: watchEmail,
    reset: resetEmail,
    formState: { errors: errorsEmail },
  } = useForm();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    watch: watchPassword,
    reset: resetPassword,
    formState: { errors: errorsPassword },
  } = useForm();

  const password = watchPassword('password');
  const email = watchEmail('email');

  const handleLogout = async (type) => {
    dispatch(setLoggedIn(false));
    dispatch(setFavorites([]));
    dispatch(setEmail(''));

    const response = await axios.get('/api/users/auth/logout', {
      withCredentials: true,
    });

    if (response.status === 200 && type !== 'Account deleted') {
      toast.success('Logout successful', {
        theme: 'colored',
      });

      router.push('/');
    } else if (response.status === 200 && type === 'Account deleted') {
      router.push('/');
    }
  };

  const onSubmitEmail = async (data) => {
    resetEmail();
    try {
      const response = await axios.put(
        '/api/users/auth/update',
        {
          email: data.email,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        dispatch(setEmail(data.email));
        toast.success('Email change successful', {
          theme: 'colored',
        });
        handleLogout();
      }
    } catch (error) {
      toast.error('Email change failed. Please try again later.', {
        theme: 'colored',
      });
    }
  };

  const onSubmitPassword = async (data) => {
    resetPassword();
    try {
      const response = await axios.put(
        '/api/users/auth/update',
        {
          currentPassword: data.currentPassword,
          newPassword: data.password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success('Password change successful', {
          theme: 'colored',
        });
        handleLogout();
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error('Invalid current password. Please try again.', {
          theme: 'colored',
        });
      } else {
        toast.error('Password change failed. Please try again later.', {
          theme: 'colored',
        });
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete('/api/users/auth/delete', {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success('Account deletion successful', {
          theme: 'colored',
        });
        handleLogout('Account deleted');
      }
    } catch (error) {
      toast.error('Account deletion failed. Please try again later.', {
        theme: 'colored',
      });
    }
  };

  return (
    <div id="settings-form" className="px-5">
      <FormSection title="Change Email">
        <Form
          method="POST"
          onSubmit={handleSubmitEmail(onSubmitEmail)}
          noValidate
        >
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
              value={DOMPurify.sanitize(currentEmail)}
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
              aria-invalid={errorsEmail.email ? 'true' : 'false'}
              className={`text-base p-3 border ${nunito.className}`}
              {...registerEmail('email', {
                required: 'New Email address is required',
                pattern: {
                  value:
                    /^(?![_.-])[a-zA-Z0-9._%+-]{1,64}(?<![_.-])@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/,
                  message: 'Invalid email address',
                },
              })}
            />
            {errorsEmail.email && (
              <Form.Text
                aria-live="polite"
                role="alert"
                className={`text-red-500 mt-2 font-bold !text-sm ${nunito.className}`}
              >
                {errorsEmail.email.message}
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
              aria-invalid={errorsEmail.confirmEmail ? 'true' : 'false'}
              className={`text-base p-3 border ${nunito.className}`}
              {...registerEmail('confirmEmail', {
                required: 'Confirm New Email address is required',
                validate: (value) => value === email || 'Emails do not match',
              })}
            />
            {errorsEmail.confirmEmail && (
              <Form.Text
                aria-live="polite"
                role="alert"
                className={`text-red-500 mt-2 font-bold !text-sm ${nunito.className}`}
              >
                {errorsEmail.confirmEmail.message}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group>
            <button
              type="submit"
              className={`submit-button text-base py-3 px-4 font-bold w-full rounded-3xl text-white ${nunito.className}`}
            >
              Update Email
            </button>
          </Form.Group>
        </Form>
      </FormSection>

      <FormSection title="Change Password">
        <Form
          method="POST"
          onSubmit={handleSubmitPassword(onSubmitPassword)}
          noValidate
        >
          <Form.Group className="mb-4">
            <Form.Label
              htmlFor="current-password"
              className={`text-base font-bold ${nunito.className}`}
            >
              Current Password
            </Form.Label>
            <div className="password-container flex items-center border">
              <Form.Control
                type={showPassword.currentPassword ? 'text' : 'password'}
                id="current-password"
                name="currentPassword"
                placeholder="Enter your password"
                aria-invalid={errorsPassword.currentPassword ? 'true' : 'false'}
                className={`text-base p-3 border-none ${nunito.className}`}
                {...registerPassword('currentPassword', {
                  required: 'Current Password is required',
                })}
              />
              <button
                type="button"
                aria-label={
                  showPassword.currentPassword
                    ? 'Hide password'
                    : 'Show password'
                }
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    currentPassword: !showPassword.currentPassword,
                  })
                }
                className="password-toggle mr-1"
              >
                {showPassword.currentPassword ? (
                  <FaEye className="password-visible" />
                ) : (
                  <PiEyeClosedBold className="password-hidden" />
                )}
              </button>
            </div>
            {errorsPassword.currentPassword && (
              <Form.Text
                aria-live="polite"
                role="alert"
                className={`text-red-500 mt-2 font-bold !text-sm ${nunito.className}`}
              >
                {errorsPassword.currentPassword.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label
              htmlFor="password"
              className={`text-base font-bold ${nunito.className}`}
            >
              New Password
            </Form.Label>
            <div className="password-container flex items-center border">
              <Form.Control
                autoComplete="off"
                type={showPassword.password ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter your password"
                aria-invalid={errorsPassword.password ? 'true' : 'false'}
                className={`text-base p-3 border-none ${nunito.className}`}
                {...registerPassword('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                    message:
                      'Password must be at least 8 characters, include at least one uppercase and lowercase letter, and at least one number',
                  },
                })}
              />
              <button
                type="button"
                aria-label={
                  showPassword.password ? 'Hide password' : 'Show password'
                }
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    password: !showPassword.password,
                  })
                }
                className="password-toggle mr-1"
              >
                {showPassword.password ? (
                  <FaEye className="password-visible" />
                ) : (
                  <PiEyeClosedBold className="password-hidden" />
                )}
              </button>
            </div>
            {errorsPassword.password && (
              <Form.Text
                aria-live="polite"
                role="alert"
                className={`text-red-500 mt-2 font-bold !text-sm ${nunito.className}`}
              >
                {errorsPassword.password.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label
              htmlFor="confirm-password"
              className={`text-base font-bold ${nunito.className}`}
            >
              Confirm New Password
            </Form.Label>
            <div className="password-container flex items-center border">
              <Form.Control
                autoComplete="off"
                type={showPassword.confirmPassword ? 'text' : 'password'}
                id="confirm-password"
                name="confirmPassword"
                placeholder="Enter your password"
                aria-invalid={errorsPassword.confirmPassword ? 'true' : 'false'}
                className={`text-base p-3 border-none ${nunito.className}`}
                {...registerPassword('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: (value) =>
                    value === password || 'Passwords do not match',
                })}
              />
              <button
                type="button"
                aria-label={
                  showPassword.confirmPassword
                    ? 'Hide password'
                    : 'Show password'
                }
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    confirmPassword: !showPassword.confirmPassword,
                  })
                }
                className="password-toggle mr-1"
              >
                {showPassword.confirmPassword ? (
                  <FaEye className="password-visible" />
                ) : (
                  <PiEyeClosedBold className="password-hidden" />
                )}
              </button>
            </div>
            {errorsPassword.confirmPassword && (
              <Form.Text
                aria-live="polite"
                role="alert"
                className={`text-red-500 mt-2 font-bold !text-sm ${nunito.className}`}
              >
                {errorsPassword.confirmPassword.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-4">
            <button
              type="submit"
              className={`submit-button text-base py-3 px-4 font-bold w-full rounded-3xl text-white ${nunito.className}`}
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
              type="button"
              onClick={() => setShow(true)}
              className={`submit-button text-base py-3 px-4 font-bold w-full rounded-3xl text-white ${nunito.className}`}
            >
              Delete Account
            </button>
          </Form.Group>
        </Form>
      </FormSection>
      <ConfirmationModal
        title="Confirm Account Deletion"
        show={show}
        setShow={setShow}
        handleDelete={handleDeleteAccount}
      />
    </div>
  );
};

export default SettingsForm;
