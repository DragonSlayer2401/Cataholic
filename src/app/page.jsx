import HeroSection from './components/Sections/HeroSection';
import CardSection from './components/Sections/CardSection';
import ReduxWrapper from './components/Wrapper/ReduxWrapper';
import { getReduxInitialState } from '@/lib/utils/fetchReduxInitialState';
import axios from 'axios';

const getImages = async () => {
  try {
    // number of images to fetch
    const limit = 8;

    const response = await axios.get(
      `${process.env.BASE_URL}/api/images?limit=${limit}&page=0`
    );

    return response.data.imageDataArray;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export default async function Home() {
  const images = await getImages();

  return (
    <>
      <main className='min-h-dvh'>
        <HeroSection
          heading="Welcome to Kitty Paradise!"
          subheading="Where fluffy tails and purrs make everything better."
        />
        <ReduxWrapper>
          <CardSection title={images.length > 0 ? "Our Adorable Fur Babies" : "Sorry, our fur babies are missing right now :("} initialImages={images} />
        </ReduxWrapper>
      </main>
    </>
  );
}
