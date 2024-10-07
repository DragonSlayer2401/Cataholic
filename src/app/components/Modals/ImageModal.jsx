import Image from 'next/image';
import { FaRegHeart, FaHeart } from 'react-icons/fa6';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap';
import './modal.css';

const ImageModal = ({ src, alt, imageId }) => {
  const addFavorite = () => {
    // Add favorite logic here
  };

  return (
    <Modal size="lg" centered>
      <ModalHeader closeButton />
      <ModalBody>
        <Image src={src} alt={alt} width={800} height={600} />
      </ModalBody>
      <ModalFooter>
        <button type="button" onClick={() => addFavorite()}>
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
