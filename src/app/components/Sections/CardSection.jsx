'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Nunito } from 'next/font/google';
import { Spinner } from 'react-bootstrap';
import ImageCard from '../Cards/ImageCard';
import ImageModal from '../Modals/ImageModal';
import axios from 'axios';
import DOMPurify from 'isomorphic-dompurify';
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
  // Store whether or not images are being fetched
  const [loading, setLoading] = useState(false);
  // Store whether or not there are more images to fetch
  const [hasMoreImages, setHasMoreImages] = useState(true);
  // Store number of viewable images
  const [visibleImages, setVisibleImages] = useState(8);
  // Store the load state of each image
  const [imageLoadStates, setImageLoadStates] = useState([
    ...new Array(initialImages.length).fill(false),
  ]);
  // Store the modal show state
  const [show, setShow] = useState(false);
  // Store the image data to be displayed in the modal
  const [imageData, setImageData] = useState({ src: '', alt: '', id: '' });
  // Reference to the observer
  const observerRef = useRef(null);
  // Reference to the load more spinner
  const loadMoreRef = useRef(null);

  // Create references to the states to use inside of the observer to overcome stale closures
  const stateRef = useRef({
    loading,
    hasMoreImages,
    visibleImages,
    imagesLength: images.length,
  });

  const getImages = useCallback(async () => {
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
  }, []);

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

  // Update the references when the states change
  useEffect(() => {
    stateRef.current = {
      loading,
      hasMoreImages,
      visibleImages,
      imagesLength: images.length,
    };
  }, [loading, hasMoreImages, visibleImages, images.length]);

  // Fetch images when the component is mounted or page changes
  useEffect(() => {
    if (hasMoreImages && page > 0) {
      getImages();
    }
  }, [page]);

  // Create the observer to load more images when the loading spinner is visible
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const { loading, hasMoreImages, visibleImages, imagesLength } =
          stateRef.current;
        // Display more images when the spinner is visible
        if (entries[0].isIntersecting && !loading && hasMoreImages) {
          setVisibleImages((prev) => prev + 12);
        }

        // Fetch more images when all images are visible
        if (visibleImages >= imagesLength && !loading && hasMoreImages) {
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
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      // removes the observer when the component is unmounted
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const renderImage = (image, index) => {
    return (
      index === 0 || imageLoadStates[index - 1] === true ? (
        <ImageCard
          key={image.id}
          src={image.url}
          alt={
            image.breeds?.length > 0
              ? image.breeds[0].name
              : 'unknown breed cat'
          }
          id={image.id}
          sendImage={sendImage}
          length={images.length}
          imageLoadHandler={() => handleImageLoad(index)}
        />
      ) : (
        <div className="image-card-placeholder" key={index}></div>
      )
    )
  }

  return (
    <section className="card-section py-[60px] flex flex-col justify-center items-center">
      <h2
        className={`text-center font-bold mb-10 text-[28px] sm:text-4xl ${nunito.className}`}
      >
        {DOMPurify.sanitize(title)}
      </h2>
      <div className="!z-0 px-5 mx-auto mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.length > 0 &&
          images
            .slice(0, visibleImages)
            .map(renderImage)}
      </div>
      {images.length > 0 && hasMoreImages && (
        <div ref={loadMoreRef} style={{ height: '5px' }}>
          <Spinner animation="border" role="status" />
        </div>
      )}
      <ImageModal imageData={imageData} show={show} setShow={setShow} />
    </section>
  );
};

export default CardSection;
