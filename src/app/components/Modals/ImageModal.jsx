import { FaRegHeart, FaHeart } from 'react-icons/fa6';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import './modal.css';
import { Nunito } from 'next/font/google';
import { useDispatch, useSelector } from 'react-redux';

const nunito = Nunito({
  weights: [700],
  subsets: ['latin'],
});

const ImageModal = ({ imageData, show, setShow }) => {
  const addFavorite = () => {
    // Add favorite logic here
  };

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
        <button
          type="button"
          onClick={() => addFavorite()}
          className={`flex items-center gap-2 font-bold text-white px-6 rounded-3xl h-11 !text-base md:!text-lg ${nunito.className}`}
        >
          Favorite
          <span>
            <FaRegHeart />
          </span>
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default ImageModal;
