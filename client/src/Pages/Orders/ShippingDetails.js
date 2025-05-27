import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ShippingDetails({orderid, trackingNumber, trackingid}) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <b className='text-info' onMouseEnter={handleShow}>
      Shipping
      </b>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{orderid} Shipping Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <h5>Tracking ID: <strong>{trackingNumber}</strong></h5>
                <h5>Courier Company: <strong>{trackingid?.name}</strong></h5>
            </Row>
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

export default ShippingDetails;
