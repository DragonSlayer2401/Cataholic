"use client"
import { FaSearch } from 'react-icons/fa';
import { Nunito } from 'next/font/google';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './header.css';



const nunito = Nunito({
  weights: [400, 700],
  subsets: ['latin'],
});

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search/?q=${searchTerm}`);
  }

  return (
    <form className="flex items-center bg-white rounded-3xl p-1 h-full" id="search-bar" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        placeholder="Search for cat breeds"
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`border-none bg-transparent rounded-3xl py-2 px-4 ${nunito.className}`}
      />
      <span className='cursor-pointer' onClick={handleSubmit}>
        <FaSearch id='search-icon' />
      </span>
    </form>
  );
};

export default SearchBar;
