import './section.css';
import { Nunito, Chewy } from 'next/font/google';

const nunito = Nunito({
  weights: [400],
  subsets: ['latin'],
});

const chewy = Chewy({
  weight: '400',
  subsets: ['latin'],
});

const HeroSection = ({ heading, subheading }) => {
  return (
    <section className="hero-section flex flex-col justify-center items-center">
      <h1 className={`text-[32px] sm:text-5xl mb-4 text-center ${chewy.className}`}>
        {heading}
      </h1>
      <h2 className={`text-lg text-center ${nunito.className}`}>
        {subheading}
      </h2>
    </section>
  );
};

export default HeroSection;
