import NavBar from './components/Header/NavBar';
import HeroSection from './components/Sections/HeroSection';
import CardSection from './components/Sections/CardSection';
import ReduxWrapper from './components/Wrapper/ReduxWrapper';
import axios from 'axios';
import { getReduxInitialState } from '@/lib/utils/fetchReduxInitialState';
import { ToastContainer } from 'react-toastify';

const getImages = async () => {
  try {
    // number of images to fetch
    const limit = 12;

    const response = await axios.get(
      `${process.env.BASE_URL}/api/images?limit=${limit}&page=0`
    );

    return response.data.imageDataArray;
  } catch (error) {
    console.error(error);
    return [{}];
  }
};
export default async function Home() {
  const preloadedState = await getReduxInitialState();
  const images = await getImages();

  return (
    <>
      <ReduxWrapper preloadedState={preloadedState}>
        <NavBar />
      </ReduxWrapper>
      <HeroSection
        heading="Welcome to Kitty Paradise!"
        subheading="Where fluffy tails and purrs make everything better."
      />
      <ReduxWrapper preloadedState={preloadedState}>
        <CardSection title="Our Adorable Cats" initialImages={images} />
      </ReduxWrapper>
    </>
  );
}
