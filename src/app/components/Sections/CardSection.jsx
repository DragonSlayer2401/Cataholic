'use client';
import { useEffect, useRef, useState } from 'react';
import { Nunito } from 'next/font/google';
import { Spinner } from 'react-bootstrap';
import ImageCard from '../Cards/ImageCard';
import ImageModal from '../Modals/ImageModal';
import axios from 'axios';
import './section.css';

const nunito = Nunito({
  weights: [700],
  subsets: ['latin'],
});

const CardSection = ({ title, initialImages, breeds }) => {
  // Store the fetched images
  const [images, setImages] = useState(initialImages);
  // Store the current page number
  const [page, setPage] = useState(0);
  // Store whether or not images ae being fetched
  const [loading, setLoading] = useState(false);
  // Store whether or not there are more images to fetch
  const [hasMoreImages, setHasMoreImages] = useState(true);
  // Store number of viewable images
  const [visibleImages, setVisibleImages] = useState(12);
  // Store the load state of each image
  const [imageLoadStates, setImageLoadStates] = useState([
    ...new Array(initialImages.length).fill(false),
  ]);
  // Store the modal show state
  const [show, setShow] = useState(false);
  // Store the image data to be displayed in the modal
  const [imageData, setImageData] = useState({ src: '', alt: '', id: '' });
  // Reference to the load more spinner
  const loadMoreRef = useRef(null);

  const getImages = async () => {
    setLoading(true);
    try {
      // number of images to fetch
      const limit = 12;

      const response =
        breeds && breeds.length > 0
          ? await axios.get(
              `/api/images?limit=${limit}&page=${page}&breeds=${breeds}`
            )
          : await axios.get(`/api/images?limit=${limit}&page=${page}`);

      const imageArray = response.data.imageDataArray;
      if (imageArray.length === 0) {
        setHasMoreImages(false);
      } else {
        setImages((prev) => [...prev, ...imageArray]);
        setImageLoadStates((prev) => [
          ...prev,
          ...new Array(imageArray.length).fill(false),
        ]);
      }
    } catch (error) {
      console.error(error);
      setHasMoreImages(false);
    } finally {
      setLoading(false);
    }
  };

  // Set image data to be showed in Modal
  const sendImage = (src, alt, id) => {
    setShow(true);
    setImageData({ src, alt, id });
  };

  // Updates the load state of an image
  const handleImageLoad = (index) => {
    setImageLoadStates((prev) => {
      const newLoadStates = [...prev];
      newLoadStates[index] = true;
      return newLoadStates;
    });
  };

  // Fetch images when the component is mounted or page changes
  useEffect(() => {
    if (hasMoreImages && page > 0) {
      getImages();
    }
  }, [page, hasMoreImages]);

  // Create the observer to load more images when the loading spinner is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Display more images when the spinner is visible
        if (entries[0].isIntersecting && !loading && hasMoreImages) {
          setVisibleImages((prev) => prev + 12);
        }

        // Fetch more images when all images are visible
        if (visibleImages >= images.length && !loading && hasMoreImages) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: null, // observe spinner relative to the viewport
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
  }, [
    loading,
    hasMoreImages,
    images.length,
    visibleImages,
  ]);

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
            index === 0 || imageLoadStates[index - 1] === true ? (
              <ImageCard
                key={image.id}
                src={image.url}
                alt={
                  image.breeds.length > 0
                    ? image.breeds[0].name
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
      {hasMoreImages && (
        <Spinner animation="border" role="status" ref={loadMoreRef} />
      )}
      <ImageModal imageData={imageData} show={show} setShow={setShow} />
    </section>
  );
};

export default CardSection;
