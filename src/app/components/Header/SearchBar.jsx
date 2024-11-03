'use client';
import { FaSearch } from 'react-icons/fa';
import { Nunito } from 'next/font/google';
import './header.css';

const nunito = Nunito({
  weights: [400, 700],
  subsets: ['latin'],
});

const SearchBar = () => {
  return (
    <form
      className="flex items-center bg-white rounded-3xl p-1 h-full"
      id="search-bar"
      method="GET"
      action="/search/"
    >
      <input
        type="text"
        name="q"
        placeholder="Search for cat breeds"
        className={`border-none bg-transparent rounded-3xl py-2 px-4 ${nunito.className}`}
      />
      <button type="submit" className="!bg-transparent">
        <FaSearch id="search-icon" />
      </button>
    </form>
  );
};

export default SearchBar;
