import NavBar from './components/Header/NavBar';
import HeroSection from './components/Sections/HeroSection';
import CardSection from './components/Sections/CardSection';
import axios from 'axios';
import ImageCard from './components/Cards/ImageCard';

const getImages = async () => {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?limit=100&api_key=${process.env.API_KEY}`
    );
    console.log(response.data[0].breeds);
    return response.data;
  } catch (error) {
    console.error(error);
    return [{}];
  }
};

export default async function Home() {
  const images = await getImages();

  return (
    <>
      <NavBar />
      <HeroSection
        heading="Welcome to Kitty Paradise!"
        subheading="Where fluffy tails and purrs make everything better."
      />
      <CardSection title="Our Adorable Cats">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            src={image.url}
            alt={
              image.breeds.length > 0
                ? `${image.breeds[0].name} cat`
                : 'unknown breed cat'
            }
            width={image.width}
            height={image.height}
          />
        ))}
      </CardSection>
    </>
  );
}
