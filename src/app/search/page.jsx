import NavBar from "../components/Header/NavBar";
import CardSection from "../components/Sections/CardSection";
import HeroSection from "../components/Sections/HeroSection";

export default async function Search() {
    return (
      <>
        <NavBar />
        <HeroSection
          heading="Welcome to Kitty Paradise!"
          subheading="Where fluffy tails and purrs make everything better."
        />
        <CardSection title="Our Adorable Cats" images={[]} />
  
      </>
    );
  }
  