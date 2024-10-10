'use client';
import { useEffect, useRef, useState } from 'react';
import { Nunito } from 'next/font/google';
import { Spinner } from 'react-bootstrap';
import ImageCard from '../Cards/ImageCard';
import './section.css';
import ImageModal from '../Modals/ImageModal';

const nunito = Nunito({
  weights: [700],
  subsets: ['latin'],
});

const CardSection = ({ title, images }) => {
  // Store loaded images
  const [visibleImages, setVisibleImages] = useState(8);
  // Store the load state of each image
  const [imageLoadStates, setImageLoadStates] = useState([false]);
  // Store the modal show state
  const [show, setShow] = useState(false);
  // Store the image data to be displayed in the modal
  const [imageData, setImageData] = useState({ src: '', alt: '', id: '' });
  // Reference to the load more spinner
  const loadMoreRef = useRef(null);

  const sendImage = (src, alt, id) => {
    setShow(true);
    setImageData({ src, alt, id });
    console.log('Image data:', imageData);
  };

  const handleImageLoad = (index) => {
    setImageLoadStates((prev) => {
      const newLoadStates = [...prev];
      newLoadStates[index] = true;
      return newLoadStates;
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Load more images when the spinner is visible
        if (entries[0].isIntersecting) {
          setVisibleImages((prev) => prev + 8);
        }
      },
      {
        root: null, // observe  spinner relative to the viewport
        rootMargin: '0px', // trigger when the spinner is visible
        threshold: 0.5, // trigger when any part of the spinner is visible
      }
    );

    // If loadMoreRef is not null, start observing the spinner
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    // remove observer when the component is unmounted
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, []);

  return (
    <section className="card-section py-[60px] flex flex-col justify-center items-center">
      <h2
        className={`text-center font-bold mb-10 text-[28px] sm:text-4xl ${nunito.className}`}
      >
        {title}
      </h2>
      <div className="!z-0 px-5 mx-auto mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images
          .slice(0, visibleImages)
          .map((image, index) =>
            index === 0 || imageLoadStates[index - 1] ? (
              <ImageCard
                key={image.id}
                src={image.url}
                alt={
                  image.breeds.length > 0
                    ? `${image.breeds[0].name} cat`
                    : 'unknown breed cat'
                }
                id={image.id}
                width={image.width}
                height={image.height}
                sendImage={sendImage}
                imageLoadHandler={() => handleImageLoad(index)}
              />
            ) : (
              <div key={index}></div>
            )
          )}
      </div>
      {visibleImages < images.length && (
        <Spinner animation="border" role="status" ref={loadMoreRef} />
      )}
      <ImageModal imageData={imageData} show={show} setShow={setShow} />
    </section>
  );
};

export default CardSection;
