'use client';
import { Form } from 'react-bootstrap';
import { Nunito } from 'next/font/google';
import './section.css';

const nunito = Nunito({
  weights: [700, 600, 400],
  subsets: ['latin'],
});

const FormSection = ({ title, children }) => {
  return (
    <section className="form-section mb-10">
      <h3 className={`font-semibold text-left text-2xl mb-3 ${nunito.className}`}>
        {title}
      </h3>
      {children}
    </section>
  );
};

export default FormSection;
