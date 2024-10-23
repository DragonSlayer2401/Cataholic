import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import { FaRegHeart, FaHeart } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';
import { Nunito } from 'next/font/google';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../redux/authSlice';
import axios from 'axios';
import './modal.css';

const nunito = Nunito({
  weights: [700],
  subsets: ['latin'],
});

const ImageModal = ({ imageData, show, setShow }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const favorites = useSelector((state) => state.auth.favorites);
  const dispatch = useDispatch();
  // Check if the image is a favorite
  const [isFavorite, setIsFavorite] = useState(
    favorites.some((favorite) => favorite.id === imageData.id)
  );
  // Tracks if the component is mounted
  const isMountedRef = useRef(true);

  const updateFavorites = async () => {
    try {
      await axios.put('/api/users/favorites/update', { favorites });
    } catch (error) {
      console.error(error);
    }
  };

  const handleFavorite = async () => {
    if (isFavorite) {
      setIsFavorite(false);
      dispatch(removeFavorite(imageData.id));
    } else {
      setIsFavorite(true);
      dispatch(addFavorite(imageData));
    }
  };

  useEffect(() => {
    // Stops the updateFavorites function from running on mount
    if (isMountedRef.current) {
      isMountedRef.current = false;
      return;
    }

    if (loggedIn && !isMountedRef.current) {
      updateFavorites();
    }
  }, [favorites]);

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
