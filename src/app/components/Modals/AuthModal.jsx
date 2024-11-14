import { useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { MdCancel, MdCheckCircle } from 'react-icons/md';
import { FaEye } from 'react-icons/fa6';
import { PiEyeClosedBold } from 'react-icons/pi';
import { Nunito, Chewy } from 'next/font/google';
import { toast } from 'react-toastify';
import axios from 'axios';
import './modal.css';
import { useDispatch } from 'react-redux';
import { setLoggedIn } from '../../redux/authSlice';
import Link from 'next/link';

const nunito = Nunito({
  weights: [400, 700],
  subsets: ['latin'],
});

const chewy = Chewy({
  weight: '400',
  subsets: ['latin'],
});

const AuthModal = ({ show, setShow, title, type, setModalData }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch('password');

  const passwordRequirements = {
    length: password?.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password || ''),
    number: /\d/.test(password),
  };

  const loginUser = async (data) => {
    try {
      const response = await axios.post(
        `/api/users/auth/login`,
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success('Login successful', {
          theme: 'colored',
        });

        dispatch(setLoggedIn(true));

        setShow(false);
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        toast.error('Invalid credentials', {
          theme: 'colored',
        });
      } else {
        toast.error('Login failed. Please try again later.', {
          theme: 'colored',
        });
      }
    }
  };

  const signupUser = async (data) => {
    try {
      const response = await axios.post(`/api/users/auth/signup`, {
        email: data.email,
        password: data.password,
      });

      if (response.status === 201) {
        await loginUser(data);
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error('Email is already in use', {
          theme: 'colored',
        });
      } else {
        toast.error('Signup failed. Please try again later.', {
          theme: 'colored',
        });
      }
    }
  };

  const onSubmit = async (data) => {
    // clears the form after submission
    reset();
    if (type === 'login') {
      await loginUser(data);
    } else {
      await signupUser(data);
    }
  };

  return (
    <Modal
      size="lg"
      centered
      show={show}
      onHide={() => setShow(false)}
      id="auth-modal"
    >
      <Modal.Header closeButton className="p-4 border-none">
        <Modal.Title
          className={`text-2xl sm:text-[32px] mx-auto ${chewy.className}`}
        >
          {title}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Modal.Body>
          <Form.Group className="mb-4">
            <Form.Label
              htmlFor="email-input"
              className={`text-sm sm:text-base font-bold ${nunito.className}`}
            >
              Email
            </Form.Label>
            <Form.Control
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              aria-invalid={errors.email ? 'true' : 'false'}
              className={`text-base p-3 border ${nunito.className}`}
              {...register('email', {
                required: 'Email address is required',
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
              htmlFor="password"
              className={`text-sm sm:text-base font-bold ${nunito.className}`}
            >
              Password
            </Form.Label>
            <div className="password-container flex items-center border">
              <Form.Control
                type={showPassword.password ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter your password"
                aria-describedby="password-help"
                aria-invalid={errors.password ? 'true' : 'false'}
                className={`text-base p-3 border-none ${nunito.className}`}
                {...register('password', {
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
            {type === 'signup' && (
              <Form.Text id="password-help">
                <ul className="mt-2">
                  <li className={`flex items-center gap-2 ${nunito.className}`}>
                    {passwordRequirements.length ? (
                      <MdCheckCircle className="success-check" />
                    ) : (
                      <MdCancel className="failure-x" />
                    )}{' '}
                    At least 8 characters
                  </li>
                  <li className={`flex items-center gap-2 ${nunito.className}`}>
                    {passwordRequirements.lowercase ? (
                      <MdCheckCircle className="success-check" />
                    ) : (
                      <MdCancel className="failure-x" />
                    )}{' '}
                    At least 1 lowercase letter
                  </li>
                  <li className={`flex items-center gap-2 ${nunito.className}`}>
                    {passwordRequirements.uppercase ? (
                      <MdCheckCircle className="success-check" />
                    ) : (
                      <MdCancel className="failure-x" />
                    )}{' '}
                    At least 1 uppercase letter
                  </li>
                  <li className={`flex items-center gap-2 ${nunito.className}`}>
                    {passwordRequirements.number ? (
                      <MdCheckCircle className="success-check" />
                    ) : (
                      <MdCancel className="failure-x" />
                    )}{' '}
                    At least 1 number
                  </li>
                </ul>
              </Form.Text>
            )}
            {errors.password && (
              <Form.Text
                aria-live="polite"
                role="alert"
                className={`text-red-500 mt-2 font-bold !text-sm ${nunito.className}`}
              >
                {errors.password.message}
              </Form.Text>
            )}
            {type === 'login' && (
              <Link
                href="/forgot-password"
                id="forgot-password-link"
                onClick={() => setShow(false)}
                className={`font-bold text-base block ${nunito.className}`}
              >
                Forgot password?
              </Link>
            )}
          </Form.Group>
          {type === 'signup' && (
            <Form.Group className="mb-4">
              <Form.Label
                htmlFor="confirm-password"
                className={`text-base font-bold ${nunito.className}`}
              >
                Confirm Password
              </Form.Label>
              <div className="password-container flex items-center border">
                <Form.Control
                  type={showPassword.confirmPassword ? 'text' : 'password'}
                  id="confirm-password"
                  name="confirmPassword"
                  placeholder="Enter your password"
                  aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                  className={`text-base p-3 border-none ${nunito.className}`}
                  {...register('confirmPassword', {
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
              {errors.confirmPassword && (
                <Form.Text
                  aria-live="polite"
                  role="alert"
                  className={`text-red-500 mt-2 font-bold !text-sm ${nunito.className}`}
                >
                  {errors.confirmPassword.message}
                </Form.Text>
              )}
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer className="border-none">
          <button
            type="submit"
            className={`text-base lg:text-lg py-3 px-6 font-bold w-full rounded-3xl text-white ${nunito.className}`}
          >
            {type === 'login' ? 'Login' : 'Signup'}
          </button>
          {type === 'login' ? (
            <p
              className={`font-bold text-base mx-auto text-[#a971a9] ${nunito.className}`}
            >
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() =>
                  setModalData({ title: 'Join Our Community!', type: 'signup' })
                }
                className={`font-bold text-base bg-transparent switch-modal-text ${nunito.className}`}
              >
                Signup
              </button>
            </p>
          ) : (
            <p
              className={`font-bold text-base mx-auto text-[#a971a9] ${nunito.className}`}
            >
              Already have an account?{' '}
              <button
                type="button"
                onClick={() =>
                  setModalData({ title: 'Welcome Back!', type: 'login' })
                }
                className={`font-bold text-base bg-transparent switch-modal-text ${nunito.className}`}
              >
                Login
              </button>
            </p>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AuthModal;
