'use client';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
    weights: [700],
    subsets: ['latin'],
  })

const FavoriteCardsSection = ({ title }) => {
  return (
    <h2
      className={`text-center font-bold mb-10 text-[28px] sm:text-4xl ${nunito.className}`}
    >
      {title}
    </h2>
  );
};

export default FavoriteCardsSection;
