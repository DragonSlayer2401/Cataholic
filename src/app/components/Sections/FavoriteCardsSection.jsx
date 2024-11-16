'use client';
import { Nunito } from 'next/font/google';
import './section.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import ImageModal from '../Modals/ImageModal';
import ImageCard from '../Cards/ImageCard';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';

const nunito = Nunito({
  weights: [700],
  subsets: ['latin'],
});

const FavoriteCardsSection = ({ title, initialImages }) => {
  // Store the fetched images
  const [images, setImages] = useState(initialImages);
  // Store the last created at date
  const [date, setDate] = useState(
    initialImages[initialImages.length - 1].createdAt
  );
  // Store whether or not images are being fetched
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
  // Reference to the observer
  const observerRef = useRef(null);
  // Reference to the load more spinner
  const loadMoreRef = useRef(null);

  // Create references to the states to use inside of the observer to overcome stale closures
  const stateRef = useRef({
    date,
    loading,
    hasMoreImages,
    visibleImages,
    imagesLength: images.length,
  });

  // Add an image back into the displayed images
  const addImage = (image) => {
    setImages((prev) => [...prev, image]);
  };

  // Remove one of the displayed images
  const removeImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  // Set image data to be showed in Modal
  const sendImage = useCallback((src, alt, id) => {
    setShow(true);
    setImageData({ src, alt, id });
  }, []);

  const getImages = async () => {
    setLoading(true);
    try {
      const { date } = stateRef.current;
      // number of images to fetch
      const limit = 12;

      const response = await axios.get(
        `/api/users/favorites?limit=${limit}&date=${date}`
      );

      const imageArray = response.data.favorites;

      if (imageArray.length === 0) {
        setHasMoreImages(false);
      } else {
        setImages((prev) => [...prev, ...imageArray]);
        setImageLoadStates((prev) => [
          ...prev,
          ...new Array(imageArray.length).fill(false),
        ]);
        setDate(imageArray[imageArray.length - 1].createdAt);
      }
    } catch (error) {
      console.error(error);
      setHasMoreImages(false);
    } finally {
      setLoading(false);
    }
  };

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
      date,
      loading,
      hasMoreImages,
      visibleImages,
      imagesLength: images.length,
    };
  }, [loading, hasMoreImages, visibleImages, images.length, date]);

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
          getImages();
        }
      },
      {
        root: null, // observe spinner relative to the viewport
        rootMargin: '0px', // trigger when the spinner is visible
        threshold: 1.0, // trigger when any part of the spinner is visible
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
        {images.length > 0 && images.slice(0, visibleImages).map(renderImage)}
      </div>
      {images.length > 0 && hasMoreImages && (
        <div ref={loadMoreRef} style={{ height: '5px' }}>
          <Spinner animation="border" role="status" />
        </div>
      )}
      <ImageModal
        imageData={imageData}
        show={show}
        setShow={setShow}
        addImage={addImage}
        removeImage={removeImage}
      />
    </section>
  );
};

export default FavoriteCardsSection;
