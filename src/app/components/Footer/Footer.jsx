import { Nunito } from 'next/font/google';

const nunito = Nunito({
    weights: [700],
    subsets: ['latin'],
  });

const Footer = () => {
  return (
    <footer className="bg-[#ffb6c1] py-10 !px-5 mt-[60px]">
      <p className={`text-white font-bold text-center sm:!text-left ${nunito.className}`}>
        &copy; {new Date().getFullYear()} Cataholic. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
