import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import { FaRegHeart, FaHeart } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';
import { Nunito } from 'next/font/google';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './modal.css';

const nunito = Nunito({
  weights: [700],
  subsets: ['latin'],
});

const ImageModal = ({ imageData, show, setShow, addImage, removeImage }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  // Check if the image is a favorite
  const [isFavorite, setIsFavorite] = useState(false);
  // Tracks if the component is mounted
  const isMountedRef = useRef(true);

  const addFavoriteToDatabase = async () => {
    try {
      await axios.post(
        `/api/users/favorites/add`,
        { id: imageData.id, alt: imageData.alt, src: imageData.src },
        { withCredentials: true }
      );

      if (addImage) {
        addImage(imageData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeFavoriteFromDatabase = async () => {
    try {
      await axios.delete(`/api/users/favorites/delete?id=${imageData.id}`, {
        withCredentials: true,
      });

      if (removeImage) {
        removeImage(imageData.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFavorite = async () => {
    if (isFavorite) {
      setIsFavorite(false);
      removeFavoriteFromDatabase();
    } else {
      setIsFavorite(true);
      addFavoriteToDatabase();
    }
  };

  useEffect(() => {
    // Stops the updateFavorites function from running on mount
    if (isMountedRef.current) {
      isMountedRef.current = false;
      return;
    }

    const checkStatus = async () => {
      try {
        const response = await axios.get(
          `/api/users/favorites/find?id=${imageData.id}`
        );

        if (response.status === 200) {
          setIsFavorite(true);
        }
      } catch (error) {
        setIsFavorite(false);

        if (error.response?.status !== 404) {
          console.error(error);
        }
      }
    };

    checkStatus();
  }, [imageData]);

  return (
    <Modal
      size="lg"
      centered
      show={show}
      onHide={() => setShow(false)}
      id="image-modal"
    >
      <ModalHeader closeButton className="p-4 border-none" />
      <ModalBody className="p-0">
        <img src={imageData.src} alt={imageData.alt} width={800} height={600} />
      </ModalBody>
      <ModalFooter className="flex justify-center p-4 border-none">
        {loggedIn && (
          <button
            type="button"
            onClick={() => handleFavorite()}
            className={`flex items-center gap-2 font-bold text-white px-6 rounded-3xl h-11 !text-base md:!text-lg ${nunito.className}`}
          >
            Favorite
            <span>{!isFavorite ? <FaRegHeart /> : <FaHeart />}</span>
          </button>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default ImageModal;
