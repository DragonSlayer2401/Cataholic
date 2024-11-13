'use client';
import { Form } from 'react-bootstrap';
import { Nunito } from 'next/font/google';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import './form.css';

const nunito = Nunito({
  weights: [700, 400],
  subsets: ['latin'],
});

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {};

  return (
      <div id="forgot-form" className="px-5">
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form.Group className="mb-4">
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
        <Form.Group>
          <button
            type="submit"
            className={`submit-button text-base py-3 px-4 font-bold w-full rounded-3xl text-white ${nunito.className}`}
          >
            Reset Password
          </button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
