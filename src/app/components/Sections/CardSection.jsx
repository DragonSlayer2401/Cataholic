import './section.css';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  weights: [700],
  subsets: ['latin'],
});

const CardSection = ({ title, children }) => {
  return (
    <section className="card-section py-[60px] flex flex-col justify-center">
      <h2
        className={`text-center font-bold mb-10 text-[28px] sm:text-4xl ${nunito.className}`}
      >
        {title}
      </h2>
      <div className="px-5 mx-auto grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {children}
      </div>
    </section>
  );
};

export default CardSection;
