import CardSection from '../components/Sections/CardSection';
import HeroSection from '../components/Sections/HeroSection';
import axios from 'axios';
import ReduxWrapper from '../components/Wrapper/ReduxWrapper';
import { getReduxInitialState } from '@/lib/utils/fetchReduxInitialState';

const getImages = async (breeds) => {
  try {
    // number of images to fetch
    const limit = 8;

    const response = await axios.get(
      `${process.env.BASE_URL}/api/images?limit=${limit}&page=0&breeds=${breeds}`
    );

    return response.data.imageDataArray;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getTitle = async (breeds) => {
  let title = 'Sorry, we do not have any ';
  if (breeds.length === 1) {
    title += `${breeds} images :(`;
  } else if (breeds.length === 2) {
    title += `${breeds[0]} or ${breeds[1]} images :(`;
  } else {
    for (let i = 0; i < breeds.length - 1; i++) {
      title += `${breeds[i]}, `;
    }
    title += `or ${breeds[breeds.length - 1]} images :(`;
  }
  return title;
};

export default async function Search({ searchParams }) {
  const preloadedState = await getReduxInitialState();
  const params = await searchParams;
  const breeds = params.q;
  const images = await getImages(breeds.split(','));
  return (
    <>
      <main className="min-h-dvh">
        <HeroSection
          heading="Welcome to Kitty Paradise!"
          subheading="Where fluffy tails and purrs make everything better."
        />
        <ReduxWrapper preloadedState={preloadedState}>
          <CardSection
            title={
              images.length > 0
                ? 'Our Adorable Fur Babies'
                : await getTitle(breeds.split(','))
            }
            initialImages={images}
            breeds={breeds}
          />
        </ReduxWrapper>
      </main>
    </>
  );
}
