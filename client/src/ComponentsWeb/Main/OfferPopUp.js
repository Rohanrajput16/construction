import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function OfferPopUp({description}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="success" className='w-100 m-1' onClick={handleShow}>
      <i className="bi bi-gift-fill"></i> Understand Your Benefits
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Offer More Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='offer-desc' dangerouslySetInnerHTML={{__html: description}}>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OfferPopUp;