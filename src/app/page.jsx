
import NavBar from './components/Header/NavBar';
import HeroSection from './components/Sections/HeroSection';
import CardSection from './components/Sections/CardSection';
import axios from 'axios';

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
  //const images = await getImages();
  return (
    <>
      <NavBar />
      <HeroSection
        heading="Welcome to Kitty Paradise!"
        subheading="Where fluffy tails and purrs make everything better."
      />
      {/* <CardSection title="Our Adorable Cats" initialImages={images} /> */}
    </>
  );
}
