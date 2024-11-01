import { Button, Modal } from 'react-bootstrap';
import { Nunito } from 'next/font/google';
import './modal.css';

const nunito = Nunito({
  weights: [700, 600, 400],
  subsets: ['latin'],
});

const ConfirmationModal = ({ show, setShow, title, handleDelete }) => {
  return (
    <Modal
      size="lg"
      centered
      show={show}
      onHide={() => setShow(false)}
      id="confirmation-modal"
    >
      <Modal.Header closeButton className="border-none">
        <Modal.Title
          className={`text-2xl sm:text-[32px] mx-auto font-bold ${nunito.className}`}
        >
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className={`font-bold text-[#a971a9] ${nunito.className}`}>
          Are you sure you want to delete your account? This action cannot be
          undone.
        </p>
      </Modal.Body>
      <Modal.Footer className="border-none">
        <button
          type="button"
          onClick={() => setShow(false)}
          className={`text-base py-3 px-4 font-bold rounded-3xl text-white ${nunito.className}`}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => handleDelete()}
          className={`text-base py-3 px-4 font-bold rounded-3xl text-white ${nunito.className}`}
        >
          Delete Account
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
