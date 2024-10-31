import { Nunito } from 'next/font/google';
import './section.css';

const nunito = Nunito({
  weights: [700],
  subsets: ['latin'],
});

const GeneralSection = ({ children, title }) => {
  return (
    <section className="general-section pt-[198px] flex flex-col justify-center items-center">
      <h2
        className={`text-center font-bold mb-10 text-[28px] sm:text-4xl ${nunito.className}`}
      >
        {title}
      </h2>
      {children}
    </section>
  );
};

export default GeneralSection;
