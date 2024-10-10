import { FaRegHeart, FaHeart } from 'react-icons/fa6';
import {
  Modal,
  ModalBody,
  ModalDialog,
  ModalFooter,
  ModalHeader,
} from 'react-bootstrap';
import './modal.css';

const ImageModal = ({ imageData, show, setShow }) => {
  const addFavorite = () => {
    // Add favorite logic here
  };

  return (
    <Modal size="lg" centered show={show} onHide={() => setShow(false)}>
      <ModalHeader closeButton className="border-none" />
      <ModalBody className="p-0">
        <img src={imageData.src} alt={imageData.alt} width={800} height={600} />
      </ModalBody>
      <ModalFooter className="flex justify-center">
        <button
          type="button"
          onClick={() => addFavorite()}
          className="flex items-center gap-2"
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
