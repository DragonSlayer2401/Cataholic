import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './globals.css';
import Footer from './components/Footer/Footer';
import ReduxWrapper from './components/Wrapper/ReduxWrapper';
import NavBar from './components/Header/NavBar';
import { getReduxInitialState } from '@/lib/utils/fetchReduxInitialState';
import axios from 'axios';

export const metadata = {
  title: 'Cataholic',
  description: 'Find adorable cat images',
  openGraph: {
    title: 'Cataholic',
    description: 'Find adorable cat images',
    url: 'https://cataholic.vercel.app',
    images: [
      {
        url: '/thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Cataholic thumbnail',
      },
    ],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default async function RootLayout({ children }) {
  let preloadedState = await getReduxInitialState();
  let oldToken;

  if (!preloadedState) {
    oldToken = true;
  }

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ReduxWrapper preloadedState={preloadedState} oldToken={oldToken}>
          <NavBar />
        </ReduxWrapper>
        {children}
        <ToastContainer
          position="top-right"
          draggable
          autoClose={1500}
          newestOnTop={true}
          closeOnClick
          pauseOnHover
          pauseOnFocusLoss
          role="alert"
          aria-live="assertive"
        />
        <Footer />
      </body>
    </html>
  );
}
