import { Nunito } from 'next/font/google';
import './section.css';

const nunito = Nunito({
  weights: [700],
  subsets: ['latin'],
});

const GeneralSection = ({ children, title }) => {
  return (
    <section className="general-section pt-[198px]">
      <h2
        className={`text-center font-bold mb-10 text-[28px] sm:text-4xl ${nunito.className}`}
      >
        {title}
      </h2>
      <div className='max-w-[800px] mx-auto'>{children}</div>
    </section>
  );
};

export default GeneralSection;
