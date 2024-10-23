import NavBar from '../components/Header/NavBar';
import CardSection from '../components/Sections/CardSection';
import HeroSection from '../components/Sections/HeroSection';
import axios from 'axios';
import ReduxWrapper from '../components/Wrapper/ReduxWrapper';

const getImages = async (breeds) => {
  try {
    // number of images to fetch
    const limit = 12;

    const response = await axios.get(
      `${process.env.BASE_URL}/api/images?limit=${limit}&page=0&breeds=${breeds}`
    );

    return response.data.imageDataArray;
  } catch (error) {
    console.error(error);
    return [{}];
  }
};

export default async function Search({ searchParams }) {
  const preloadedState = await getReduxInitialState();
  const breeds = searchParams.q;
  const images = await getImages(breeds.split(','));
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
        <CardSection
          title="Our Adorable Cats"
          initialImages={images}
          breeds={breeds}
        />
      </ReduxWrapper>
    </>
  );
}
