'use client';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Nunito } from 'next/font/google';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FaEye } from 'react-icons/fa6';
import { PiEyeClosedBold } from 'react-icons/pi';
import axios from 'axios';
import './form.css';
import { useRouter, useSearchParams } from 'next/navigation';

const nunito = Nunito({
  weights: [700, 400],
  subsets: ['latin'],
});

const ForgotPasswordForm = ({ type }) => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
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

  const onSubmitEmail = async (data) => {
    resetEmail();
    setLoading(true);
    try {
      await axios.post('/api/users/forgot-password', {
        email: data.email,
      });
      toast.success('Email sent successfully', { theme: 'colored' });
    } catch (error) {
      console.error(error);
      if (error.response?.status === 404) {
        toast.error('No account found', {
          theme: 'colored',
        });
      } else {
        toast.error('An error occurred. Please try again', {
          theme: 'colored',
        });
      }
    }
    setLoading(false);
  };

  const onSubmitPassword = async (data) => {
    resetPassword();
    try {
      const response = await axios.put(
        '/api/users/reset-password',
        {
          newPassword: data.password,
          token: searchParams.get('token'),
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success('Password reset successful. Please login.', {
          theme: 'colored',
        });
        router.push('/');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Unauthorized', {
          theme: 'colored',
        });
      } else {
        toast.error('Password reset failed. Please try again later.', {
          theme: 'colored',
        });
      }
    }
  };

  const password = watchPassword('password');

  return (
    <div id="forgot-form" className="px-5">
      {type !== 'reset' && (
        <p
          className={`mb-10 text-[#a971a9] font-bold text-center ${nunito.className}`}
        >
          Enter your email below, and we'll send you instructions to reset your
          password.
        </p>
      )}
      {type !== 'reset' && (
        <Form onSubmit={handleSubmitEmail(onSubmitEmail)} noValidate>
          <Form.Group className="mb-4">
            <Form.Control
              type="email"
              id="forgot-form-email"
              name="email"
              placeholder="Enter your email"
              aria-invalid={errorsEmail.email ? 'true' : 'false'}
              className={`text-base p-3 border ${nunito.className}`}
              {...registerEmail('email', {
                required: 'Email address is required',
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
          <Form.Group>
            <button
              type="submit"
              disabled={loading}
              style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
              className={`submit-button text-base py-3 px-4 font-bold w-full rounded-3xl text-white ${nunito.className}`}
            >
              Reset Password
            </button>
          </Form.Group>
        </Form>
      )}
      {type === 'reset' && (
        <Form onSubmit={handleSubmitPassword(onSubmitPassword)}>
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
                style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
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
          <Form.Group>
            <button
              type="submit"
              className={`submit-button text-base py-3 px-4 font-bold w-full rounded-3xl text-white ${nunito.className}`}
            >
              Reset Password
            </button>
          </Form.Group>
        </Form>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
