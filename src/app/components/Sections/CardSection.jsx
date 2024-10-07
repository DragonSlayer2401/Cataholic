'use client';
import { useEffect, useRef, useState } from 'react';
import { Nunito } from 'next/font/google';
import { Spinner } from 'react-bootstrap';
import ImageCard from '../Cards/ImageCard';
import './section.css';

const nunito = Nunito({
  weights: [700],
  subsets: ['latin'],
});

const CardSection = ({ title, images }) => {
  console.log(images);
  // Store loaded images
  const [visibleImages, setVisibleImages] = useState([]);
  // Track whether images are loading or not
  const [batchLoading, setBatchLoading] = useState(false);
  // Reference to the load more spinner
  const loadMoreRef = useRef(null);

  const loadBatch = (startIndex, batchSize) => {
    const batch = images.slice(startIndex, startIndex + batchSize);

    const imagePromises = batch.map((image, index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = image.url;
        img.onload = () => resolve({image, index: index + startIndex});
        // If the image fails to load, resolve the promise anyway to prevent blocking
        img.onerror = () => resolve({image, index: index + startIndex});
      });
    });

    Promise.all(imagePromises).then((loadedImages) => {
      const sortedImages = loadedImages.sort((a, b) => a.index - b.index).map((imageObj) => imageObj.image);
      setVisibleImages((prevImages) => [...prevImages, ...sortedImages]);
      setBatchLoading(false);
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Load more images when the spinner is visible
        if (entries[0].isIntersecting && !batchLoading) {
          setBatchLoading(true);
          loadBatch(visibleImages.length, 12);
        }
      },
      {
        root: null, // observe  spinner relative to the viewport
        rootMargin: '0px', // trigger when the spinner is visible
        threshold: 0.0, // trigger when any part of the spinner is visible
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
  }, [batchLoading, visibleImages]);

  return (
    <section className="card-section py-[60px] flex flex-col justify-center items-center">
      <h2
        className={`text-center font-bold mb-10 text-[28px] sm:text-4xl ${nunito.className}`}
      >
        {title}
      </h2>
      <div className="!z-0 px-5 mx-auto mb-10 grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {visibleImages.map((image) => (
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
      </div>
      {visibleImages.length < images.length && (
        <Spinner animation="border" role="status" ref={loadMoreRef} />
      )}
    </section>
  );
};

export default CardSection;
