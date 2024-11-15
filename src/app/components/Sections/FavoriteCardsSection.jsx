'use client';
import { Nunito } from 'next/font/google';
import './section.css';
import { useCallback, useEffect, useState } from 'react';
import ImageModal from '../Modals/ImageModal';
import ImageCard from '../Cards/ImageCard';
import { useSelector } from 'react-redux';

const nunito = Nunito({
  weights: [700],
  subsets: ['latin'],
});

const FavoriteCardsSection = ({ title, initialImages }) => {
  // Store the fetched images
  const [images, setImages] = useState(initialImages);
  // Store the load state of each image
  const [imageLoadStates, setImageLoadStates] = useState([
    ...new Array(initialImages.length).fill(false),
  ]);
  // Store the modal show state
  const [show, setShow] = useState(false);
  // Store the image data to be displayed in the modal
  const [imageData, setImageData] = useState({ src: '', alt: '', id: '' });
  // Get the favorites from the Redux store
  const favorites = useSelector((state) => state.auth.favorites);

  // Set image data to be showed in Modal
  const sendImage = useCallback((src, alt, id) => {
    setShow(true);
    setImageData({ src, alt, id });
  }, []);

  // Updates the load state of an image
  const handleImageLoad = useCallback((index) => {
    setImageLoadStates((prev) => {
      const newLoadStates = [...prev];
      newLoadStates[index] = true;
      return newLoadStates;
    });
  }, []);

  // Update the images when the favorites change
  useEffect(() => {
    setImages(favorites);
  }, [favorites]);

  const renderImage = (image, index) => {
    return index === 0 || imageLoadStates[index - 1] === true ? (
      <ImageCard
        key={image.id}
        src={image.src}
        alt={image.alt}
        id={image.id}
        sendImage={sendImage}
        length={images.length}
        imageLoadHandler={() => handleImageLoad(index)}
      />
    ) : (
      <div className="image-card-placeholder" key={index}></div>
    );
  };

  return (
    <section className="card-section pt-[198px] pb-[60px]  flex flex-col justify-center items-center">
      <h2
        className={`text-center font-bold mb-10 text-[28px] sm:text-4xl  ${nunito.className}`}
      >
        {images.length > 0 ? title : 'You have no favorited fur babies'}
      </h2>
      <div className="!z-0 px-5 mx-auto mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map(renderImage)}
      </div>
      <ImageModal imageData={imageData} show={show} setShow={setShow} />
    </section>
  );
};

export default FavoriteCardsSection;
